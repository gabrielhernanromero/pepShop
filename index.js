/**
 * PepShop API - Servidor Express
 * Punto de entrada principal de la aplicación
 * Configura Express, middlewares, rutas y sincroniza la base de datos
 */

// Importar dependencias principales
const express = require('express');

// Importar routers de cada módulo de negocio (reubicados en src/)
const productsRouter = require('./src/routes/products');
const mascotasRouter = require('./src/routes/mascotas');
const clientsRouter = require('./src/routes/clients');
const turnsRouter = require('./src/routes/turns');
const ordersRouter = require('./src/routes/orders');

// Importar base de datos y middlewares centralizados
const { sequelize } = require('./models');
const { requestLogger, errorHandler, notFoundHandler } = require('./src/middlewares');

/**
 * Crear instancia de aplicación Express
 * app es el objeto principal que maneja todas las peticiones HTTP
 */
const app = express();

/**
 * MIDDLEWARES GLOBALES
 * Se ejecutan en TODAS las peticiones antes de llegar a las rutas
 */

// Parsear JSON en el body de las peticiones
app.use(express.json());

// Logger personalizado: registra método, URL, status y tiempo de cada petición
app.use(requestLogger);

/**
 * CONFIGURACIÓN DEL SERVIDOR
 */

// Puerto de escucha: se puede configurar con variable de entorno PORT, por defecto 3000
const puerto = process.env.PORT || 3000;

/**
 * RUTAS (ENDPOINTS)
 * Cada ruta está dividida por dominio de negocio para facilitar mantenimiento
 */

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a la tienda de mascotas');
});

// Montar routers de cada dominio en sus prefijos respectivos
app.use('/api/productos', productsRouter);      // CRUD de productos
app.use('/api/mascotas', mascotasRouter);        // CRUD de mascotas (asociadas a clientes)
app.use('/api/clientes', clientsRouter);        // CRUD de clientes
app.use('/api/turnos', turnsRouter);            // CRUD de turnos/citas
app.use('/api/pedidos', ordersRouter);          // CRUD de pedidos/órdenes

/**
 * MIDDLEWARES DE MANEJO DE ERRORES
 * Deben ir después de todas las rutas para capturar todas las peticiones
 */

// Manejar rutas no encontradas (404)
app.use(notFoundHandler);

// Manejo centralizado de errores (debe ser SIEMPRE el último middleware)
app.use(errorHandler);

/**
 * INICIALIZACIÓN DEL SERVIDOR
 * 1. Sincronizar Sequelize con la base de datos (crear/actualizar tablas)
 * 2. Iniciar servidor Express en el puerto configurado
 */
sequelize.sync()
    .then(() => {
        app.listen(puerto, () => {
            console.log(`Servidor escuchando en el puerto ${puerto}`);
        });
    })
    .catch((err) => {
        console.error('No se pudo sincronizar la base de datos:', err);
        process.exit(1);
    });


