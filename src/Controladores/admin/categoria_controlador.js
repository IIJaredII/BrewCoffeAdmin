
const db = require('../../db');

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
    db.query(query, [0,id], (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    });
};