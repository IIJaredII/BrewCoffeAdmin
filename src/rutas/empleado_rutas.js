const express = require('express');

const path = require('path');
const router = express.Router();

const empleado = require('../Controladores/empleados_controlador');

router.post('/login', empleado.login);
router.get("/listar/pedidos-local", empleado.listarPedidosLocal);
router.get("/listar/pedidos-online", empleado.listarPedidosOnline);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/empleado/html/login.html'));
});

router.get('/pedidos', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/empleado/html/pedidos-pendientes.html'));
});

router.get('/protected',empleado.autentificarToken,(req,res)=>{
    res.sendFile(path.join(__dirname, '../../public/empleado/html/dashboard.html'));
})

module.exports=router;