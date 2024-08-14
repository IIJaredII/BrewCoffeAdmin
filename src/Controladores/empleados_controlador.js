const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const db = require('../db');
const SECRET_KEY = 'Empleados';

//login-----------------------------------------------------------------------------------------------------
exports.login = (req, res) => {
    const { correo, password } = req.body;
    const sql = 'SELECT * FROM empleados WHERE ID_empleado = ?';
    db.query(sql, [correo], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'No se encontro su cuenta' });
        }
        const empleado = results[0];
        bcrypt.compare(password, empleado.Contraseña, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign(
                { id: empleado.ID_empleado, nombre: empleado.Nombre }, 
                SECRET_KEY, 
                { expiresIn: '24h' }
            ); 

            res.send({token,empleado});
        });
    });
};
//-----------------------------------------------------------------------------------------------------

//Registrar cliente------------------------------------------------------------------------------------
exports.crearCliente = (req, res) => {
    const { id,nombre,telefono,correo,password} = req.body;

    // Verificar si cliente ya existe
    const validacion = 'SELECT * FROM clientes WHERE correo = ?';
    db.query(validacion, [correo], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            return res.status(400).json({ message: 'Este correo electronico ya esta registrado' });
        }

        // Hashear la contraseña
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error al hashear la contraseña:', err);
                return res.status(500).json({ message: 'Error interno al crear cliente' });
            }

            // Insertar el nuevo cliente en la base de datos
            const insertCliente = 'INSERT INTO clientes (ID_cliente, Nombre, Telefono, correo, Contraseña, estado) VALUES (?,?,?,?,?,?)';
            db.query(insertCliente, [id, nombre, telefono, correo, hash, 1], (err, result) => {
                if (err) {
                    console.error('Error al insertar cliente en la base de datos:', err);
                    return res.status(500).json({ message: 'Error interno al crear cliente' });
                }
                res.status(201).json({ message: 'Su registro se completó exitosamente' });
            });
        });
    });
};
//-----------------------------------------------------------------------------------------------------

exports.productos = (req, res) => {
    const {ID} = req.query;
    query=`
        Select * 
        FROM
            detalles_venta
        where id_venta=?
    `;
    db.query(query,[ID], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}

exports.listarPedidosLocal = (req,res) => {
    const query = `
       SELECT 
            C.Nombre AS Nombre_Cliente,
            DV.Tamaño_porcion AS Tipo_Producto,
            DV.Cantidad,
            DV.Comentario
        FROM 
            Ventas V
        INNER JOIN 
            clientes C ON V.ID_cliente = C.ID_cliente
        INNER JOIN 
            Detalles_venta DV ON V.ID_venta = DV.ID_venta
        INNER JOIN 
            productos P ON DV.ID_producto = P.ID_producto
        WHERE 
            V.Estado = 1  -- Pendiente
            AND V.Tipo_venta = 1  -- En Local
        ORDER BY 
            C.Nombre ASC;
    `;

    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}

exports.listarPedidosOnline = (req,res) => {
    const query = `
       SELECT 
            C.Nombre AS Nombre_Cliente,
            DV.Tamaño_porcion AS Tipo_Producto,
            DV.Cantidad,
            DV.Comentario
        FROM 
            Ventas V
        INNER JOIN 
            clientes C ON V.ID_cliente = C.ID_cliente
        INNER JOIN 
            Detalles_venta DV ON V.ID_venta = DV.ID_venta
        INNER JOIN 
            productos P ON DV.ID_producto = P.ID_producto
        WHERE 
            V.Estado = 1  -- Pendiente
            AND V.Tipo_venta = 2  -- En Línea
        ORDER BY 
            C.Nombre ASC;
    `;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
}

//Tokens-----------------------------------------------------------------------------------------------------

exports.autentificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.cliente = user;
        next();
    });
};

//-----------------------------------------------------------------------------------------------------