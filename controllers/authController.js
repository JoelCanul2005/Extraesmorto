const authService = require('../services/authService');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username y password son requeridos" });
    }

    try {
        const token = await authService.login(username, password);
        return res.json({ message: "Login exitoso", token });
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

module.exports = { login };
