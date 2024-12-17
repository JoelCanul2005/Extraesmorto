const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    // Verifica si el token existe
    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        // Extraer el token sin la palabra 'Bearer'
        const bearerToken = token.split(' ')[1];

        // Verifica el token
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded; // Guarda la información del usuario decodificado en req.user

        next(); // Continúa al siguiente middleware o ruta
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

module.exports = authMiddleware;
