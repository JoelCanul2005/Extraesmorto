const db = require('../config/db');

// Obtener todos los clientes
exports.getAllClientes = (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize; // Cálculo del offset
    const query = 'SELECT * FROM clientes LIMIT ? OFFSET ?';
    const countQuery = 'SELECT COUNT(*) AS total FROM clientes'; // Consulta para contar el total de registros

    return new Promise((resolve, reject) => {
        // Primero, consulta el total de registros
        db.query(countQuery, (err, countResult) => {
            if (err) {
                return reject(err); // Si ocurre un error, lo rechazamos
            }

            const total = countResult[0].total; // Total de registros

            // Luego, realiza la consulta de paginación con LIMIT y OFFSET
            db.query(query, [pageSize, offset], (err, rows) => {
                if (err) {
                    return reject(err); // Si ocurre un error, lo rechazamos
                }

                // Retorna tanto los datos de la página como el total de registros
                resolve({ rows, total });
            });
        });
    });
};

// Obtener un cliente por ID
exports.getClienteById = (id) => {
    const query = 'SELECT * FROM clientes WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows[0]); // Devuelve el primer cliente encontrado
        });
    });
};

// Crear un cliente
exports.createCliente = (clienteData) => {
    const query = 'INSERT INTO clientes (nombre, direccion, telefono, comida_favorita_navideña, descuento_navidad) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        db.query(query, [
            clienteData.nombre,
            clienteData.direccion,
            clienteData.telefono,
            clienteData.comida_favorita_navideña,
            clienteData.descuento_navidad
        ], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve({ id: result.insertId, ...clienteData });
        });
    });
};

// Actualizar un cliente
exports.updateCliente = (id, clienteData) => {
    const query = 'UPDATE clientes SET nombre = ?, direccion = ?, telefono = ?, comida_favorita_navideña = ?, descuento_navidad = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [
            clienteData.nombre,
            clienteData.direccion,
            clienteData.telefono,
            clienteData.comida_favorita_navideña,
            clienteData.descuento_navidad,
            id
        ], (err, result) => {
            if (err) {
                return reject(err);
            }
            if (result.affectedRows === 0) {
                return resolve(null); // No se encontró el cliente con ese ID
            }
            resolve({ id, ...clienteData });
        });
    });
};

// Eliminar un cliente
exports.deleteCliente = (id) => {
    const query = 'DELETE FROM clientes WHERE id = ?';
    return new Promise((resolve, reject) => {
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            if (result.affectedRows === 0) {
                return resolve({ message: 'Cliente no encontrado' });
            }
            resolve({ message: 'Cliente eliminado' });
        });
    });
};
