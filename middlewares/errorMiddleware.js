/**
 * Middleware de Manejo de Errores
 * Captura y procesa errores de toda la aplicación
 * Debe ser el último middleware en la cadena de middlewares
 */

/**
 * Manejador centralizado de errores
 * Detecta el tipo de error y retorna respuesta apropiada con código HTTP correcto
 * @param {Error} err - Objeto de error capturado
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Siguiente middleware
 */
function errorHandler(err, req, res, next) {
  // Log del error en consola con timestamp para debugging
  console.error('❌ Error:', {
    message: err.message,
    stack: err.stack,
    timestamp: new Date().toISOString(),
  });

  // Errores de validación de Sequelize (campos inválidos)
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Error de validación en la base de datos',
      details: err.errors.map((e) => e.message),
    });
  }

  // Errores de constraint único (duplicate entry, etc.)
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      error: 'Conflicto: el valor ya existe en la base de datos',
    });
  }

  // Errores de conexión a la base de datos
  if (err.name === 'SequelizeConnectionError') {
    return res.status(503).json({
      success: false,
      error: 'Error de conexión a la base de datos. Intenta más tarde.',
    });
  }

  // Errores genéricos de Sequelize (otros)
  if (err.name && err.name.startsWith('Sequelize')) {
    return res.status(500).json({
      success: false,
      error: 'Error en la base de datos',
    });
  }

  // Error interno del servidor (fallback)
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
  });
}

/**
 * Manejador de rutas no encontradas (404)
 * Se ejecuta si ninguna otra ruta coincide
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

module.exports = {
  errorHandler,
  notFoundHandler,
};
