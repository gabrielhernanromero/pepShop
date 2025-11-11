/**
 * Controlador de Mascotas
 * Maneja las peticiones HTTP y coordina con el servicio de mascotas
 * Responsable de recibir datos, validar formato y devolver respuestas
 */

const mascotasService = require('../services/mascotasService');

/**
 * Listar todas las mascotas
 * GET /api/mascotas
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware (manejo de errores)
 */
async function list(req, res, next) {
  try {
    const items = await mascotasService.listMascotas();
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener una mascota por ID
 * GET /api/mascotas/:id
 * @param {Object} req - Petición con ID en params
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function getById(req, res, next) {
  try {
    const item = await mascotasService.getMascota(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Mascota no encontrada' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

/**
 * Crear una nueva mascota
 * POST /api/mascotas
 * Body: { name, species, breed?, age?, clienteId? }
 * @param {Object} req - Petición con datos en body
 * @param {Object} res - Respuesta HTTP con código 201
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function create(req, res, next) {
  try {
    const created = await mascotasService.createMascota(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

/**
 * Actualizar una mascota existente
 * PUT /api/mascotas/:id
 * Body: { name?, species?, breed?, age?, clienteId? } - campos opcionales
 * @param {Object} req - Petición con ID en params y datos en body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function update(req, res, next) {
  try {
    const updated = await mascotasService.updateMascota(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Mascota no encontrada' });
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * Eliminar una mascota
 * DELETE /api/mascotas/:id
 * @param {Object} req - Petición con ID en params
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function remove(req, res, next) {
  try {
    const count = await mascotasService.deleteMascota(req.params.id);
    if (count === 0) return res.status(404).json({ success: false, error: 'Mascota no encontrada' });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById, create, update, remove };
