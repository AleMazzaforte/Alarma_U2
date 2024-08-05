const express = require('express');
const router = express.Router();
const controlador = require('../controllers/controlador')
const { isLogged } = require('../middleware/auth');
// router.get('/', controlador.getIndex) 
// router.get('/admin', controlador.getAdmin)

// router.get('/api/data', controlador.getData)
// 
// router.get('/delete/:control', controlador.deleteData);
// router.get('/update/:control', controlador.getUpdateForm);
// router.put('/update/:control', controlador.updateRegistro);

// Ruta para la página principal (acceso libre)
router.get('/', controlador.getIndex);

// Ruta para la página de administrador (requiere autenticación)
router.get('/admin', isLogged, controlador.getAdmin);

// Ruta para la página de login
router.get('/login', controlador.getLogin);
router.post('/login', controlador.postLogin);

// Ruta para obtener datos (requiere autenticación)
router.get('/api/data', controlador.getData);

// Ruta para agregar datos (requiere autenticación)
router.post('/add', isLogged, controlador.postAdmin);

// Ruta para borrar datos (requiere autenticación)
router.delete('/delete/:control', isLogged, (req, res, next) => {
    console.log('DELETE request received for control:', req.params.control);
    next();
}, controlador.deleteData);


// Ruta para mostrar el formulario de actualización (requiere autenticación)
router.get('/update/:control', isLogged, controlador.getUpdateForm);

// Ruta para actualizar datos (requiere autenticación)
router.put('/update/:control', isLogged, controlador.updateRegistro);
module.exports = router
