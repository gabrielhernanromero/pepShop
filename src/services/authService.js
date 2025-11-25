// Importa el modelo Cliente y el paquete jsonwebtoken
const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar el token JWT
const SECRET = process.env.JWT_SECRET || 'pepShopSuperSecreto';

/**
 * Servicio de login
 * - Busca el usuario por email
 * - Verifica la contraseña con bcrypt
 * - Si es válida, genera un token JWT
 * - El token incluye un payload con datos públicos del usuario
 */
async function login({ email, password }) {
  if (!email || !password) throw new Error('Email y password requeridos');
  // Busca el usuario por email
  const user = await Cliente.findOne({ where: { email } });
  if (!user) throw new Error('Usuario no encontrado');
  // Verifica la contraseña usando el método de instancia
  const valid = await user.verifyPassword(password);
  if (!valid) throw new Error('Password incorrecta');
  // Construye el payload: datos públicos que irán en el token
  const payload = { id: user.id, email: user.email, name: user.name };
  // Genera el token JWT usando el payload y la clave secreta
  // El token se puede usar para autenticar al usuario en futuras peticiones
  const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });
  // Retorna el token y los datos públicos del usuario
  return { token, user: payload };
}

// Exporta la función de login para usar en el controlador
module.exports = { login };