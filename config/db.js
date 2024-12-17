const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'junction.proxy.rlwy.net',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'uaedxTpEZYTBWVHByUKsggAVrcLluqkJ',
    database: process.env.DB_NAME || 'railway',
    port: process.env.DB_PORT || '59859',
});

db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err.message);
        return;
    }
    console.log('Conexión a la base de datos exitosa.');
});

module.exports = db;