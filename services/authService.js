const authRepository = require('../repositories/authRepository');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const login = async (username, password) => {
    const user = await authRepository.findByUsername(username);

    if (!user || user.password !== password) {
        throw new Error("Credenciales incorrectas");
    }

    // Generar token JWT
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return token;
};

module.exports = { login };
