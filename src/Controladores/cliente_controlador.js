const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const SECRET_KEY = 'llave_xD';

//login-----------------------------------------------------------------------------------------------------
exports.login = (req, res) => {
    const { correo, password } = req.body;
    const sql = 'SELECT * FROM clientes WHERE correo = ?';
    db.query(sql, [correo], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            return res.status(401).json({ message: 'Correo no registrado' });
        }

        const cliente = results[0];
        bcrypt.compare(password, cliente.Contraseña, (err, isMatch) => {
            if (err) throw err;
            if (!isMatch) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }

            const token = jwt.sign({ id: cliente.id_cliente, nombre: cliente.nombre }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
            console.log(token);
        });
    });
};
//-----------------------------------------------------------------------------------------------------

//signin-----------------------------------------------------------------------------------------------------
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

//Tokens-----------------------------------------------------------------------------------------------------

exports.autentificarToken = (token=localStorage.getItem('token'), res, next) => {
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.cliente = user;
        next();
    });
};
//-----------------------------------------------------------------------------------------------------