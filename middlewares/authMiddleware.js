/**
 * Middleware de Autenticación
 * Verifica tokens para proteger endpoints sensibles
 * NOTA: En producción, usar JWT real con secreto seguro desde .env
 */

// Token simulado para desarrollo y demostración
// En producción usar: process.env.ADMIN_TOKEN con JWT real (jsonwebtoken package)
const ADMIN_TOKEN = 'admin-token-12345';

/**
 * Verificar token de autenticación
 * Extrae el token del header Authorization con formato "Bearer <token>"
 * y lo valida contra el token conocido
 * 
 * Uso en rutas protegidas:
 *   router.delete('/:id', verifyAdminToken, controller.remove);
 * 
 * Enviar en peticiones:
 *   curl -H "Authorization: Bearer admin-token-12345" http://localhost:3000/api/productos/1
 * 
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Siguiente middleware si token es válido
 * 
 * @returns {401} Si no hay Authorization header
 * @returns {403} Si token es inválido o no coincide
 * @returns {next} Si token es válido, continúa al siguiente middleware
 */
function verifyAdminToken(req, res, next) {
  // Obtener el header Authorization
  const authHeader = req.headers.authorization;

  // Validar que el header exista y tenga el formato correcto "Bearer <token>"
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Token requerido. Use header: Authorization: Bearer <token>',
    });
  }

  // Extraer el token (remover el prefijo "Bearer ")
  const token = authHeader.slice(7);

  // Comparar el token contra el token válido
  if (token !== ADMIN_TOKEN) {
    return res.status(403).json({
      success: false,
      error: 'Token inválido o expirado',
    });
  }

  // Token válido, permitir acceso al siguiente middleware/controlador
  next();
}

module.exports = {
  verifyAdminToken,
  ADMIN_TOKEN,
};
