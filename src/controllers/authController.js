// Controlador de autenticación
// Responsable de recibir las credenciales, validar formato y delegar al servicio
const authService = require('../services/authService');

// Validación simple de formato de email mediante expresión regular
function isEmail(email) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

/**
 * POST /api/auth/login
 * Body esperado: { email: string, password: string }
 * Flujo:
 * 1. Validar presencia de campos
 * 2. Validar formato de email
 * 3. Delegar al servicio para verificar credenciales y generar token JWT
 * 4. Responder con { token, user } si éxito o error 401 si falla
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    // Validar campos obligatorios
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email y password requeridos' });
    }
    // Validar formato de email
    if (!isEmail(email)) {
      return res.status(400).json({ success: false, error: 'Formato de email inválido' });
    }
    // Llamar al servicio de autenticación
    const result = await authService.login({ email, password });
    // Responder sin exponer hash ni salt
    res.json({ success: true, token: result.token, user: result.user });
  } catch (err) {
    // Errores de credenciales => 401 (no autorizado)
    res.status(401).json({ success: false, error: err.message });
  }
}

module.exports = { login };