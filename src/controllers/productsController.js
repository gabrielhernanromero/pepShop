/**
 * Controlador de Productos
 * Maneja las peticiones HTTP y coordina con el servicio de productos
 * Responsable de recibir datos, validar formato y devolver respuestas
 */

const productsService = require('../services/productsService');

/**
 * Listar todos los productos
 * GET /api/productos
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function list(req, res, next) {
  try {
    const items = await productsService.listProducts();
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
}

/**
 * Obtener un producto por ID
 * GET /api/productos/:id
 * @param {Object} req - Petición con ID en params
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function getById(req, res, next) {
  try {
    const item = await productsService.getProduct(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'No encontrado' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
}

/**
 * Crear un nuevo producto
 * POST /api/productos
 * Body: { name, description?, price, stock }
 * @param {Object} req - Petición con datos en body
 * @param {Object} res - Respuesta HTTP con código 201
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function create(req, res, next) {
  try {
    const created = await productsService.createProduct(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

/**
 * Actualizar un producto existente
 * PUT /api/productos/:id
 * Body: { name?, description?, price?, stock? } - campos opcionales
 * @param {Object} req - Petición con ID en params y datos en body
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function update(req, res, next) {
  try {
    const updated = await productsService.updateProduct(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

/**
 * Eliminar un producto
 * DELETE /api/productos/:id
 * @param {Object} req - Petición con ID en params
 * @param {Object} res - Respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
async function remove(req, res, next) {
  try {
    await productsService.deleteProduct(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById, create, update, remove };
