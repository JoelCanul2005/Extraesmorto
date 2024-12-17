const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Autentica a un usuario y genera un token JWT
 *     description: Realiza el login de un usuario con su nombre de usuario y contraseña para obtener un token JWT.
 *     tags:
 *       - Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "stevenssamantha"
 *               password:
 *                 type: string
 *                 example: "nkFyO7M5n^9!"
 *     responses:
 *       200:
 *         description: Autenticación exitosa, devuelve un token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Solicitud incorrecta, faltan datos o están mal formateados
 *       401:
 *         description: Usuario o contraseña incorrectos
 *       500:
 *         description: Error en el servidor
 */
router.post('/login', authController.login);

module.exports = router;
