const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'expres_cafe'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Base de datos conectada');
});

module.exports = db;