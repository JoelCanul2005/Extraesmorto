const clientesService = require('../services/clientesService');

// Obtener todos los clientes
exports.getAllClientes = async (req, res) => {
    try {
        // Obtener los parámetros de la solicitud (si no se proporcionan, usa valores predeterminados)
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        // Llamamos al servicio para obtener los datos paginados
        const result = await clientesService.getAllClientes(page, pageSize);

        // Enviamos los resultados con los datos de paginación
        res.json({
            data: result.data,  // Los registros obtenidos
            total: result.total,  // Total de registros
            totalPages: result.totalPages,  // Total de páginas calculadas
            currentPage: result.currentPage  // Página actual solicitada
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los clientes' });
    }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await clientesService.getClienteById(id);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el cliente', error: error.message });
    }
};

// Crear un cliente
exports.createCliente = async (req, res) => {
    const clienteData = req.body;
    try {
        const nuevoCliente = await clientesService.createCliente(clienteData);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el cliente', error: error.message });
    }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
    const { id } = req.params;
    const clienteData = req.body;
    try {
        const clienteActualizado = await clientesService.updateCliente(id, clienteData);
        if (!clienteActualizado) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el cliente', error: error.message });
    }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await clientesService.deleteCliente(id);
        if (resultado.message === 'Cliente eliminado') {
            res.json({ message: 'Cliente eliminado' });
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
};
