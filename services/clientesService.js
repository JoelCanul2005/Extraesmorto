const clientesRepository = require('../repositories/clientesRepository');

// Obtener todos los clientes
exports.getAllClientes = async (page, pageSize) => {
    try {
        // Llamamos al repositorio para obtener los datos paginados
        const result = await clientesRepository.getAllClientes(page, pageSize);

        // Calculamos el número total de páginas
        const totalPages = Math.ceil(result.total / pageSize);

        return {
            data: result.rows, // Los registros obtenidos
            total: result.total, // Total de registros
            totalPages, // Total de páginas calculadas
            currentPage: page // Página actual solicitada
        };
    } catch (error) {
        throw new Error('Error al obtener los clientes: ' + error.message);
    }
};

// Obtener un cliente por ID
exports.getClienteById = async (id) => {
    try {
        return await clientesRepository.getClienteById(id);
    } catch (error) {
        throw new Error('Error en el servicio al obtener el cliente: ' + error.message);
    }
};

// Crear un cliente
exports.createCliente = async (clienteData) => {
    try {
        return await clientesRepository.createCliente(clienteData);
    } catch (error) {
        throw new Error('Error en el servicio al crear el cliente: ' + error.message);
    }
};

// Actualizar un cliente
exports.updateCliente = async (id, clienteData) => {
    try {
        return await clientesRepository.updateCliente(id, clienteData);
    } catch (error) {
        throw new Error('Error en el servicio al actualizar el cliente: ' + error.message);
    }
};

// Eliminar un cliente
exports.deleteCliente = async (id) => {
    try {
        return await clientesRepository.deleteCliente(id);
    } catch (error) {
        throw new Error('Error en el servicio al eliminar el cliente: ' + error.message);
    }
};
