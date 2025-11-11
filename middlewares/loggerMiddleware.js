/**
 * Middleware de Logging
 * Registra información detallada de cada petición HTTP
 * Útil para debugging y monitoreo de la aplicación
 */

/**
 * Logger de peticiones HTTP
 * Intercepta cada request y registra:
 *  - Método HTTP (GET, POST, PUT, DELETE, etc.)
 *  - URL/ruta solicitada
 *  - Código de estado HTTP de la respuesta
 *  - Tiempo de procesamiento en milisegundos
 * 
 * Códigos de color:
 *  - 🟢 (2xx): OK - Petición exitosa
 *  - 🟡 (3xx): Redirección
 *  - 🔴 (4xx-5xx): Error
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Siguiente middleware en la cadena
 */
function requestLogger(req, res, next) {
  // Registrar el tiempo de inicio de la petición
  const start = Date.now();

  // Guardar el método original end() para poder interceptarlo
  const originalEnd = res.end;

  // Reemplazar res.end() para ejecutar el log después de que la respuesta esté lista
  res.end = function (...args) {
    // Calcular duración total de la petición
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    // Seleccionar emoji según el código de estado HTTP
    const logColor = statusCode >= 400 ? '🔴' : statusCode >= 300 ? '🟡' : '🟢';
    
    // Imprimir log con formato completo y legible
    console.log(
      `${logColor} [${new Date().toISOString()}] ${req.method} ${req.originalUrl} - Status: ${statusCode} - ${duration}ms`
    );

    // Llamar al método original para finalizar la respuesta
    originalEnd.apply(res, args);
  };

  next();
}

module.exports = {
  requestLogger,
};
