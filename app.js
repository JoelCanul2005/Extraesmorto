const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const clientesRoutes = require('./routes/clientesRoutes'); // Asegúrate de que exista este archivo.

dotenv.config();
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'EXTRAORDINARIO',
            version: '1.0.0',
            description: 'Documentación',
        },
    },
    apis: ['./routes/*.js'], // Define las rutas donde Swagger buscará la documentación
};
const swaggerSpec = swaggerJsdoc(options);

// Rutas de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
