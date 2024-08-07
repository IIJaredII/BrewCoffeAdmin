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

router.get('/productos/crud', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'crud-producto.html'));
});

router.get('/menu/crud',(req,res) =>{
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'menu-crud.html'));
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

//Productos--------------------------------------------------------------------------------------------
router.get('/productos/listar', admin.listarProduto);
//-----------------------------------------------------------------------------------------------------


//tamaño_porcion--------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------


module.exports=router;