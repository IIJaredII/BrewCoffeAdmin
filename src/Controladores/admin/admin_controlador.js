const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../../db');


//categoria-----------------------------------------------------------------------------------------------------

exports.crearCategoria = (req, res) => {
    const { nombre, descripcion } = req.body;
    const validarNombre = 'SELECT * FROM categorias_producto WHERE LOWER(Nombre) = LOWER(?)';
    db.query(validarNombre, [nombre], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'Ya existe una categoria con ese nombre' });
        }

        const categoria = 'INSERT INTO categorias_producto(Nombre,Descripcion,Estado) VALUES (?,?,?)';
        db.query(categoria, [nombre, descripcion, 1], (err) => {
            if (err) throw err;
            res.status(201).json({ message: 'La categoria se ha registrado correctamente' });
        });
    });
};

exports.listarCategorias = (req, res) => {
    const query = 'SELECT * FROM categorias_producto';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.actualizarCategoria = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    const query = 'UPDATE categorias_producto SET nombre = ? WHERE ID_categoria = ?';
    db.query(query, [nombre, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría actualizada exitosamente' });
    });
};

exports.eliminarCategoria = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE categorias_producto SET Estado = ? WHERE ID_categoria = ?';
    db.query(query, [0, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
};
//-----------------------------------------------------------------------------------------------------


//Productos-----------------------------------------------------------------------------------------------------
exports.crearProducto = (req, res) => {
    const { nombre, descripcion } = req.body;
    const validarNombre = 'SELECT * FROM productos WHERE LOWER(Nombre) = LOWER(?)';
    db.query(validarNombre, [nombre], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'Ya existe una categoria con ese nombre' });
        }

        const categoria = 'INSERT INTO categorias_producto(Nombre,Descripcion,Estado) VALUES (?,?,?)';
        db.query(categoria, [nombre, descripcion, 1], (err) => {
            if (err) throw err;
            res.status(201).json({ message: 'La categoria se ha registrado correctamente' });
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
    const query = 'SELECT * FROM Productos';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.eliminarProducto = (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE categorias_producto SET Estado = ? WHERE ID_categoria = ?';
    db.query(query, [0, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
};
//-----------------------------------------------------------------------------------------------------

//Empleados-----------------------------------------------------------------------------------------------------
exports.crearProducto = (req, res) => {
    const { nombre, descripcion } = req.body;
    const validarNombre = 'SELECT * FROM productos WHERE LOWER(Nombre) = LOWER(?)';
    db.query(validarNombre, [nombre], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'Ya existe una categoria con ese nombre' });
        }

        const categoria = 'INSERT INTO categorias_producto(Nombre,Descripcion,Estado) VALUES (?,?,?)';
        db.query(categoria, [nombre, descripcion, 1], (err) => {
            if (err) throw err;
            res.status(201).json({ message: 'La categoria se ha registrado correctamente' });
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
    db.query(query, [0, id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
};
//Menu Pedidos-----------------------------------------------------------------------------------------------------
exports.menuProductos = (req, res) => {
    const query = 'SELECT ID_producto, Nombre FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            res.status(500).send('Error obteniendo los productos');
            return;
        }
        res.json(results);
    });
}

exports.menuPorciones = (req, res) => {
    const productId = req.params.id;
    const query = `SELECT tipo, Precio FROM tamano_porcion WHERE ID_producto = ?`;
    
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta:', err);
            return res.status(500).send('Error obteniendo porciones');
        }
        res.json(results);
    });
}

exports.menuVentas = (req, res) =>{
    const { nombreCliente, nombreEmpleado, total } = req.body;
    if (!nombreCliente || !nombreEmpleado || !total) {
        return res.status(400).send('Faltan datos en la solicitud');
    }

    // Consulta JOIN para obtener ID_cliente y ID_empleado
    const sql = `
        SELECT c.ID_cliente, e.ID_empleado 
        FROM clientes c 
        INNER JOIN empleados e ON e.Nombre = ? 
        WHERE c.Nombre = ?
    `;

    db.query(sql, [nombreEmpleado, nombreCliente], (err, results) => {
        if (err) {
            console.error('Error ejecutando la consulta JOIN:', err);
            return res.status(500).send('Error al ejecutar la consulta');
        }
        if (results.length === 0) {
            return res.status(404).send('Cliente o empleado no encontrado');
        }

        const { ID_cliente } = results[0];
        const { ID_empleado } = results[0];

        // Insertar en la tabla ventas
        const insertSql = 'INSERT INTO ventas (ID_cliente, ID_empleado, Total, Estado, Tipo_venta, Metodo_pago) VALUES (?, ?, ?, 1, 2, 2)';
        db.query(insertSql, [ID_cliente, ID_empleado, total], (err, result) => {
            if (err) {
                console.error('Error al insertar en la tabla ventas:', err);
                return res.status(500).send('Error al insertar en la base de datos');
            }
            res.send('Venta registrada correctamente');
            console.log('Venta registrada correctamente');
        });
    });
}