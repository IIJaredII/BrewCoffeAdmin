const express = require('express');
const path = require('path');
const router = express.Router();

const cliente = require('../Controladores/cliente_controlador');

//Fuciones por parte del servidor----------------------------------------------------------------------
router.post('/cliente/login', cliente.login);
router.put('/cliente/signin', cliente.crearCliente);
//-----------------------------------------------------------------------------------------------------


//redireccionamientos ---------------------------------------------------------------------------------
router.get('/dashboard', cliente.autentificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/cliente/html', 'dashboard.html'));
});

router.get('/iniciar-sesion',(req, res) => {
    res.sendFile(path.join(__dirname, '../../public/cliente/html', 'login.html'));
});

router.get('/registrarse',(req,res) => {
    res.sendFile(path.join(__dirname, '../../public/cliente/html', 'signin.html'));
});
//-----------------------------------------------------------------------------------------------------

module.exports = router;