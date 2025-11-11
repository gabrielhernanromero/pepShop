/**
 * Controlador de Turnos
 * Maneja las peticiones HTTP y coordina con el servicio de turnos
 * Responsable de recibir datos, validar formato y devolver respuestas
 */

const turnsService = require('../services/turnsService');

/**
 * Listar todos los turnos
 * GET /api/turnos
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function list(req, res, next) {
  try {
    const items = await turnsService.listTurns();
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener un turno por ID
 * GET /api/turnos/:id
 * @param {Object} req - Petición con ID en params
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function getById(req, res, next) {
  try {
    const item = await turnsService.getTurn(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Turno no encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

/**
 * Crear un nuevo turno
 * POST /api/turnos
 * Body: { dateTime, reason?, status?, clienteId? }
 * @param {Object} req - Petición con datos en body
 * @param {Object} res - Respuesta HTTP con código 201
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function create(req, res, next) {
  try {
    const created = await turnsService.createTurn(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

/**
 * Actualizar un turno existente
 * PUT /api/turnos/:id
 * Body: { dateTime?, reason?, status?, clienteId? } - campos opcionales
 * @param {Object} req - Petición con ID en params y datos en body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function update(req, res, next) {
  try {
    const updated = await turnsService.updateTurn(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Turno no encontrado' });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * Eliminar un turno
 * DELETE /api/turnos/:id
 * @param {Object} req - Petición con ID en params
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function remove(req, res, next) {
  try {
    const count = await turnsService.deleteTurn(req.params.id);
    if (count === 0) return res.status(404).json({ success: false, error: 'Turno no encontrado' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById, create, update, remove };
