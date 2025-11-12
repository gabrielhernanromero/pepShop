/**
 * Middleware de Validación
 * Valida que los datos de entrada cumplan criterios básicos antes de ser procesados
 * Se aplica a rutas POST y PUT para asegurar integridad de datos
 */

/**
 * Validar datos de creación/actualización de Producto
 * Requiere: name (string), price (número >= 0)
 * Opcional: description, stock
 * @param {Object} req - Petición HTTP con body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Continúa al siguiente middleware si válido
 */
function validateProduct(req, res, next) {
  const { name, price, stock } = req.body;

  // Validar que el nombre existe y no esté vacío
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'El campo "name" es requerido y debe ser una cadena de texto no vacía',
    });
  }

  // Validar precio (debe ser número >= 0)
  if (price === undefined || price === null) {
    return res.status(400).json({
      success: false,
      error: 'El campo "price" es requerido',
    });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({
      success: false,
      error: 'El campo "price" debe ser un número mayor o igual a 0',
    });
  }

  // Validar stock (opcional, pero si se proporciona debe ser entero >= 0)
  if (stock !== undefined && stock !== null) {
    if (typeof stock !== 'number' || stock < 0 || !Number.isInteger(stock)) {
      return res.status(400).json({
        success: false,
        error: 'El campo "stock" debe ser un entero mayor o igual a 0',
      });
    }
  }

  next();
}

/**
 * Validar datos de creación/actualización de Mascota
 * Requiere: name (string), species (string)
 * Opcional: breed, age (entero >= 0), clienteId (numero)
 * @param {Object} req - Petición HTTP con body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Continúa al siguiente middleware si válido
 */
function validateMascota(req, res, next) {
  const { name, species } = req.body;

  // Validar nombre
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'El campo "name" es requerido y debe ser una cadena de texto no vacía',
    });
  }

  // Validar especie (requerida)
  if (!species || typeof species !== 'string' || species.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'El campo "species" es requerido y debe ser una cadena de texto no vacía',
    });
  }

  // Validar age si se proporciona (debe ser entero >= 0)
  if (req.body.age !== undefined && req.body.age !== null) {
    if (typeof req.body.age !== 'number' || req.body.age < 0 || !Number.isInteger(req.body.age)) {
      return res.status(400).json({
        success: false,
        error: 'El campo "age" debe ser un entero mayor o igual a 0',
      });
    }
  }

  // Validar clienteId si se proporciona (debe ser número válido)
  if (req.body.clienteId !== undefined && req.body.clienteId !== null) {
    if (isNaN(Number(req.body.clienteId))) {
      return res.status(400).json({ success: false, error: 'El campo "clienteId" debe ser un número' });
    }
  }

  next();
}

/**
 * Validar datos de creación/actualización de Cliente
 * Requiere: name (string)
 * Opcional: email, phone
 * @param {Object} req - Petición HTTP con body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Continúa al siguiente middleware si válido
 */
function validateClient(req, res, next) {
  const { name, email } = req.body;
  
  // Validar nombre (requerido)
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ success: false, error: 'El campo "name" es requerido y debe ser una cadena de texto no vacía' });
  }
  
  // Validar email si se proporciona
  if (email !== undefined && email !== null) {
    if (typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ success: false, error: 'El campo "email" debe ser una cadena de texto válida' });
    }
  }
  
  next();
}

/**
 * Validar datos de creación/actualización de Turno
 * Requiere: dateTime (fecha válida)
 * Opcional: reason, status, clienteId
 * @param {Object} req - Petición HTTP con body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Continúa al siguiente middleware si válido
 */
function validateTurn(req, res, next) {
  const { dateTime, clienteId } = req.body;
  
  // Validar dateTime (requerido)
  if (!dateTime) {
    return res.status(400).json({ success: false, error: 'El campo "dateTime" es requerido' });
  }
  
  // Validar clienteId si se proporciona
  if (clienteId !== undefined && clienteId !== null && isNaN(Number(clienteId))) {
    return res.status(400).json({ success: false, error: 'El campo "clienteId" debe ser un número' });
  }
  
  next();
}

/**
 * Validar datos de creación/actualización de Pedido
 * Requiere: total (número >= 0)
 * Opcional: status, clienteId
 * @param {Object} req - Petición HTTP con body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Continúa al siguiente middleware si válido
 */
function validateOrder(req, res, next) {
  const { total, clienteId } = req.body;
  
  // Validar total (requerido y debe ser número >= 0)
  if (total === undefined || total === null) {
    return res.status(400).json({ success: false, error: 'El campo "total" es requerido' });
  }
  if (typeof total !== 'number' || total < 0) {
    return res.status(400).json({ success: false, error: 'El campo "total" debe ser un número mayor o igual a 0' });
  }
  
  // Validar clienteId si se proporciona
  if (clienteId !== undefined && clienteId !== null && isNaN(Number(clienteId))) {
    return res.status(400).json({ success: false, error: 'El campo "clienteId" debe ser un número' });
  }
  
  next();
}

module.exports = {
  validateProduct,
  validateMascota,
  validateClient,
  validateTurn,
  validateOrder,
};
