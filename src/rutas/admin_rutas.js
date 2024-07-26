const express = require('express');
const path = require('path');
const router = express.Router();

//declaracion para los controladores-------------------------------------------------------------------
const admin = require('../Controladores/admin/admin_controlador');
//-----------------------------------------------------------------------------------------------------

//Redirecciones----------------------------------------------------------------------------------------
router.get('/empleados/crud', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'crud-empleado.html'));
});

router.get('/categoria/crud', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'crud-categoria.html'));
});
//-----------------------------------------------------------------------------------------------------

//categorias-------------------------------------------------------------------------------------------
router.post('/categoria/crear', admin.crearCategoria);
router.get('/categoria/listar', admin.listarCategorias);
router.put('/categoria/actualizar/:id', admin.actualizarCategoria);
router.put('/categoria/eliminar/:id', admin.eliminarCategoria);
//-----------------------------------------------------------------------------------------------------

//empleados--------------------------------------------------------------------------------------------
router.get('/empleados/listar', admin.listarEmpleados);
//-----------------------------------------------------------------------------------------------------

module.exports=router;