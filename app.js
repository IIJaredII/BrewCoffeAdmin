const express = require('express');
const http = require('http');
const path = require('path'); //unir strings
const app = express();
const server = http.createServer(app);


// Middleware para servir archivos estáticos y parsear JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//no se si se consideran apis... bueno aun no se que es una api xD-------------------------------------
//declaraciones
const r_cliente=require('./src/rutas/cliente_ruta.js');
const r_admin = require('./src/rutas/admin_rutas.js');

//usos-------------------------------------------------------------------------------------------------
app.use('/admin',r_admin);
app.use('/',r_cliente);
//-----------------------------------------------------------------------------------------------------

//Algunas direcciones -----------------------------------------------------------------------------------------------------
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/cliente/html', 'index.html'));
});

app.get('/add-categoria', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/master/html', 'crud-categoria.html'));
});

app.get('/registrarse', (req,res) => {
    res.sendFile(path.join(__dirname, 'public/cliente/html', 'signin.html'));
});
//----------------------------------------------------------------------------------------------------

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT} para ingresar al servidor es http://localhost:3000/`);
});