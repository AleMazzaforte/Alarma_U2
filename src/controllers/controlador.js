const { conn } = require('../../src/db/db');

// Variables para usuario y contraseña
const AUTH_USER = 'admin';
const AUTH_PASSWORD = 'password';

module.exports = {
    getIndex: async (req, res) => {
        res.render('index');
    },

    getAdmin: async (req, res) => {
        res.render('admin1');
    },

    getLogin: async (req, res) => {
        res.render('login');
    },

    // Autenticación utilizando variables
    postLogin: async (req, res) => {
        const { username, password } = req.body;
        if (username === AUTH_USER && password === AUTH_PASSWORD) {
            req.session.isAuthenticated = true;
            req.session.user = { username }; 
            return res.redirect('/admin');
        } else {
            res.status(401).send('Credenciales inválidas');
        }
    },

    getData: async (req, res) => {
        try {
            const [rows] = await conn.query('SELECT * FROM Alarma_Comunitaria');
            res.json(rows);
        } catch (error) {
            console.error('Error al obtener datos:', error);
            res.status(500).send('Error al procesar la solicitud');
        }
    },

    postAdmin: async (req, res) => {
        const { control, lote, direccion, telefono, nombre } = req.body;
        console.log('Datos recibidos:', req.body);

        try {
            const [result] = await conn.query(
                'INSERT INTO Alarma_Comunitaria (control, lote, direccion, telefono, nombre) VALUES (?, ?, ?, ?, ?)',
                [control, lote, direccion, telefono, nombre]
            );
            res.redirect('/admin');
        } catch (error) {
            console.error('Error al insertar en la base de datos:', error);
            res.status(500).send(`Error al procesar la solicitud: ${error.message}`);
        }
    },

    deleteData: async (req, res) => {
        const { control } = req.params;
        console.log('Deleting data for control:', control);
        try {
            const [result] = await conn.query('DELETE FROM Alarma_Comunitaria WHERE control = ?', [control]);
            if (result.affectedRows === 0) {
                res.status(404).send('Recurso no encontrado');
            } else {
                res.status(200).send('Registro eliminado con éxito');
            }
        } catch (error) {
            console.error('Error al borrar datos:', error);
            res.status(500).send('Error al procesar la solicitud');
        }
    },

    getUpdateForm: async (req, res) => {
        const { control } = req.params;
        const [rows] = await conn.query('SELECT * FROM Alarma_Comunitaria WHERE control = ?', [control]);
        const registro = rows[0];
        res.render('update1', { registro });
    },

    updateRegistro: async (req, res) => {
        const { control } = req.params;
        const { lote, direccion, telefono, nombre } = req.body;
        try {
            await conn.query(
                'UPDATE Alarma_Comunitaria SET lote = ?, direccion = ?, telefono = ?, nombre = ? WHERE control = ?',
                [lote, direccion, telefono, nombre, control]
            );
            res.redirect('/admin');
        } catch (error) {
            console.error('Error al actualizar el registro:', error);
            res.status(500).send(`Error al procesar la solicitud: ${error.message}`);
        }
    }
    
};
