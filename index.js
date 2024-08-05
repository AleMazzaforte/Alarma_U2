const express = require('express');
const path = require('path');
const rutas = require('./src/routes/router.js')
const session = require('express-session');
const bcrypt = require('bcrypt')
const auth = require('./src/middleware/auth.js')
const isLogged = require('./src/middleware/auth').isLogged;
const app = express();

const overrride = require('method-override');


const port = process.env.PORT || 8080;


app.set('view engine', 'ejs')
// Configurar la carpeta por defecto para vistas (views)
app.set('views', path.join(__dirname, '/src/views'));

// Configurar la carpeta public
app.use(express.static(path.join(__dirname + '/public')));

app.use(express.urlencoded({ extended: true }));
app.use(overrride('_method'));

app.use(session({
    secret: 'S3cr3t_H@sh01',
    resave: false,
    saveUninitialized: false
}));


app.use('/', rutas);

app.use((req, res, next) => {
    res.status(404).send(`<h1 style = 'color: red'>Recurso no encontrado</h1>`)
})

app.listen(`${port}`, (req, res) => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})



