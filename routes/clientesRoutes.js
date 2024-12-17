const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');
const authMiddleware = require('../middlewares/authMiddleware');

// Definimos las rutas del CRUD y protegemos con el middleware
router.get('/', authMiddleware, clientesController.getAllClientes);
router.get('/:id', authMiddleware, clientesController.getClienteById);
router.post('/', authMiddleware, clientesController.createCliente);
router.put('/:id', authMiddleware, clientesController.updateCliente);
router.delete('/:id', authMiddleware, clientesController.deleteCliente);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   responses:
 *     UnauthorizedError:
 *       description: No autorizado, se requiere autenticación.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: No autorizado.
 */

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     description: Devuelve una lista de todos los clientes registrados en el sistema. Requiere autenticación.
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         description: Número de página para la paginación.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         description: Número máximo de clientes por página.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *           example: 20
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con éxito.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     description: Registra un nuevo cliente en el sistema. Requiere autenticación.
 *     tags:
 *       - Clientes
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               comida_favorita_navideña:
 *                 type: string
 *               descuento_navidad:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Cliente creado con éxito.
 *       400:
 *         description: Solicitud incorrecta, faltan campos requeridos.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por ID
 *     description: Devuelve los detalles de un cliente específico basado en su ID. Requiere autenticación.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cliente encontrado.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza los datos de un cliente
 *     description: Actualiza la información de un cliente existente en el sistema. Requiere autenticación.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a actualizar.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               comida_favorita_navideña:
 *                 type: string
 *               descuento_navidad:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Cliente actualizado con éxito.
 *       400:
 *         description: Solicitud incorrecta, faltan campos requeridos.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por ID
 *     description: Elimina un cliente específico basado en su ID. Requiere autenticación.
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del cliente a eliminar.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

module.exports = router;
