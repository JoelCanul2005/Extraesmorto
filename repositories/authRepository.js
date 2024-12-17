const db = require('../config/db');

const findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM usuarios WHERE username = ?',
            [username],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]); // Devolvemos el primer usuario encontrado
            }
        );
    });
};

module.exports = { findByUsername };
