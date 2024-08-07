const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../db');


//categoria-----------------------------------------------------------------------------------------------------

exports.crearCategoria = (req, res) => {
    const{nombre,descripcion} = req.body;
    const validarNombre = 'SELECT * FROM categorias_producto WHERE LOWER(Nombre) = LOWER(?)';
    db.query(validarNombre,[nombre],(err,results) => {
        if(err) throw err;
        if(results.length > 0){
            return res.status(400).json({ message:'Ya existe una categoria con ese nombre'});
        }

        const categoria = 'INSERT INTO categorias_producto(Nombre,Descripcion,Estado) VALUES (?,?,?)';
        db.query(categoria,[nombre,descripcion,1], (err) =>{
            if(err) throw err;
            res.status(201).json({message:'La categoria se ha registrado correctamente'});
        });
    });
};

exports.listarCategorias = (req, res) => {
    const query = 'SELECT * FROM categorias_producto WHERE Estado = ?';
    db.query(query,[1], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.buscarCategoria = (req, res) => {
    const { opc, dato } = req.query;
    
    let query = 'SELECT * FROM categorias_producto WHERE Estado = 1';
    const params = [];
    switch (opc) {
        case 1:
            query += ' AND ID_categoria = ?';
            params.push(dato);
        break;
        
        case 2:
            query += ' AND LOWER(Nombre) LIKE LOWER(?)';
            params.push(`%${dato}%`);
        break
        
        default:
            query = 'SELECT * FROM categorias_producto WHERE Estado = 1';
        break;
    }
    db.query(query, params, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.actualizarCategoria = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    const query = 'UPDATE categorias_producto SET Nombre = ?, Descripcion = ? WHERE ID_categoria = ?';
    db.query(query, [nombre, descripcion, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría actualizada exitosamente' });
    });
};


exports.eliminarCategoria = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE categorias_producto SET Estado = ? WHERE ID_categoria = ?';
    db.query(query, [0,id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
};
//-----------------------------------------------------------------------------------------------------


//Productos-----------------------------------------------------------------------------------------------------
exports.crearProducto = (req, res) => {
    const{nombre,descripcion} = req.body;
    const validarNombre = 'SELECT * FROM productos WHERE LOWER(Nombre) = LOWER(?)';
    db.query(validarNombre,[nombre],(err,results) => {
        if(err) throw err;
        if(results.length > 0){
            return res.status(400).json({ message:'Ya existe una categoria con ese nombre'});
        }

        const categoria = 'INSERT INTO categorias_producto(Nombre,Descripcion,Estado) VALUES (?,?,?)';
        db.query(categoria,[nombre,descripcion,1], (err) =>{
            if(err) throw err;
            res.status(201).json({message:'La categoria se ha registrado correctamente'});
        });
    });
};

exports.actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = 'UPDATE categorias_producto SET nombre = ? WHERE ID_categoria = ?';
    db.query(query, [nombre, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría actualizada exitosamente' });
    });
};

exports.listarProduto = (req, res) => {
    const query = `
        SELECT p.ID_producto, p.nombre, c.Nombre AS Categoria, COUNT(tp.ID_producto) AS Variantes
        FROM productos p
        INNER JOIN tamano_porcion tp ON p.id_producto = tp.id_producto
        INNER JOIN categorias_producto c ON p.ID_categoria = c.ID_categoria
        WHERE p.estado = 1
        GROUP BY p.ID_producto, p.nombre, c.Nombre; 
    `;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE categorias_producto SET Estado = ? WHERE ID_categoria = ?';
    db.query(query, [0,id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
};
//-----------------------------------------------------------------------------------------------------

//Empleados-----------------------------------------------------------------------------------------------------
exports.crearProducto = (req, res) => {
    const{nombre,descripcion} = req.body;
    const validarNombre = 'SELECT * FROM productos WHERE LOWER(Nombre) = LOWER(?)';
    db.query(validarNombre,[nombre],(err,results) => {
        if(err) throw err;
        if(results.length > 0){
            return res.status(400).json({ message:'Ya existe una categoria con ese nombre'});
        }

        const categoria = 'INSERT INTO categorias_producto(Nombre,Descripcion,Estado) VALUES (?,?,?)';
        db.query(categoria,[nombre,descripcion,1], (err) =>{
            if(err) throw err;
            res.status(201).json({message:'La categoria se ha registrado correctamente'});
        });
    });
};

exports.actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = 'UPDATE categorias_producto SET nombre = ? WHERE ID_categoria = ?';
    db.query(query, [nombre, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría actualizada exitosamente' });
    });
};

exports.listarEmpleados = (req, res) => {
    const query = 'SELECT * FROM Empleados';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE categorias_producto SET Estado = ? WHERE ID_categoria = ?';
    db.query(query, [0,id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
};
//-----------------------------------------------------------------------------------------------------