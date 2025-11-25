/**
 * PepShop API - Servidor Express
 * Punto de entrada principal de la aplicación
 * Configura Express, middlewares, rutas y sincroniza la base de datos
 */

// Importar dependencias principales
const express = require('express');
const { SERVER_PORT } = require('./config/config');

// Routers (se montarán dinámicamente más abajo para evitar errores
// mientras la capa de modelos/BD se reconfigura desde cero)

// Importar conexión a BD (MySQL via Sequelize) y middlewares
const conection = require('./src/conection/conection');
const { requestLogger, errorHandler, notFoundHandler } = require('./src/middlewares');

// Importar modelos para forzar su registro y sincronización
require('./src/models');

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

// Puerto de escucha: usa variable de entorno SERVER_PORT o por defecto 3000
const puerto = SERVER_PORT || 3000;

/**
 * RUTAS (ENDPOINTS)
 * Cada ruta está dividida por dominio de negocio para facilitar mantenimiento
 */

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Bienvenido a la tienda de mascotas');
});

// Los routers se montarán más abajo, tras autenticarse a la base de datos.

/**
 * INICIALIZACIÓN DEL SERVIDOR
 * 1. Autenticar conexión MySQL con Sequelize
 * 2. Sincronizar modelos con la base de datos (crear/actualizar tablas)
 * 3. Montar routers y levantar el servidor
 */
async function iniciarServidor() {
    try {
        await conection.authenticate();
        console.log('✅ Conexión MySQL establecida correctamente');

        // Sincronizar modelos con la base de datos
        await conection.sync({ alter: true });
        console.log('✅ Tablas sincronizadas en la base de datos');

        // Intentar montar routers; si fallan (por falta de modelos), avisar y continuar
        try {
            const productsRouter = require('./src/routes/products');
            const mascotasRouter = require('./src/routes/mascotas');
            const clientsRouter = require('./src/routes/clients');
            const turnsRouter = require('./src/routes/turns');
            const ordersRouter = require('./src/routes/orders');
            const authRouter = require('./src/routes/auth');

            app.use('/api/productos', productsRouter);
            app.use('/api/mascotas', mascotasRouter);
            app.use('/api/clientes', clientsRouter);
            app.use('/api/turnos', turnsRouter);
            app.use('/api/pedidos', ordersRouter);
            app.use('/api/auth', authRouter);
            console.log('🧭 Rutas API montadas');
        } catch (routesErr) {
            console.warn('⚠️ No se pudieron montar las rutas aún (pendiente capa de modelos/servicios):', routesErr.message);
        }

        /**
         * MIDDLEWARES DE MANEJO DE ERRORES
         * Deben ir después de todas las rutas para capturar todas las peticiones
         */

        // Manejar rutas no encontradas (404)
        app.use(notFoundHandler);

        // Manejo centralizado de errores (debe ser SIEMPRE el último middleware)
        app.use(errorHandler);

        app.listen(puerto, () => {
            console.log(`🚀 Servidor escuchando en el puerto ${puerto}`);
        });
    } catch (err) {
        console.error('❌ Error al conectar a la base de datos:', err);
        process.exit(1);
    }
}

iniciarServidor();

