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

router.get('/cliente/crud', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'crud-clientes.html'));
});

router.get('/productos/crud', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'crud-producto.html'));
});

router.get('/menu/crud',(req,res) =>{
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'menu-crud.html'));
});

router.get('/venta', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin/html', 'menu-pedidos.html'));
});
//-----------------------------------------------------------------------------------------------------

//categorias-------------------------------------------------------------------------------------------
router.post('/categoria/crear', admin.crearCategoria);
router.get('/categoria/listar', admin.listarCategorias);
router.put('/categoria/actualizar/:id', admin.actualizarCategoria);
router.put('/categoria/eliminar/:id', admin.eliminarCategoria);
//-----------------------------------------------------------------------------------------------------

//empleados--------------------------------------------------------------------------------------------
router.post('/empleado/crear',admin.crearEmpleado);
router.get('/empleado/listar', admin.listarEmpleados);
//-----------------------------------------------------------------------------------------------------

//Clienetes-----------------------------------------------------------------------------------------------------
router.post('/cliente/crear', admin.crearCliente);
router.get('/cliente/listar', admin.listarClientes);
router.put('/cliente/actualizar/:id', admin.actualizarCliente);
router.put('/cliente/eliminar/:id', admin.eliminarCliente);
//-----------------------------------------------------------------------------------------------------

//menu-pedidos--------------------------------------------------------------------------------------------
router.get('/menu/productos', admin.menuProductos);
router.get('/menu/porciones/:id', admin.menuPorciones);
router.post('/menu/ventas', admin.menuVentas);


module.exports=router;