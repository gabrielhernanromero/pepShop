/**
 * Servicio de Productos
 * Contiene la lógica de negocio para operaciones CRUD de productos
 * Gestiona el inventario y disponibilidad de productos en la tienda
 */

const { Product } = require('../../models');

/**
 * Listar todos los productos disponibles
 * @returns {Promise<Array>} Array de todos los productos
 */
async function listProducts() {
  return await Product.findAll();
}

/**
 * Obtener un producto específico por ID
 * @param {number} id - ID del producto
 * @returns {Promise<Object|null>} Objeto de producto o null si no existe
 */
async function getProduct(id) {
  return await Product.findByPk(Number(id));
}

/**
 * Crear un nuevo producto
 * Valida y normaliza los datos de entrada
 * @param {Object} data - Datos del producto { name, description, price, stock }
 * @returns {Promise<Object>} Objeto de producto creado
 * @throws {Error} Si hay error en la creación
 */
async function createProduct(data) {
  const payload = {
    name: data.name,
    description: data.description || null,
    price: Number(data.price) || 0,
    stock: Number(data.stock) || 0,
  };
  return await Product.create(payload);
}

/**
 * Actualizar un producto existente
 * Solo actualiza los campos proporcionados
 * @param {number} id - ID del producto a actualizar
 * @param {Object} data - Campos a actualizar (name, description, price, stock)
 * @returns {Promise<Object>} Producto actualizado con datos recientes
 */
async function updateProduct(id, data) {
  const payload = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.description !== undefined) payload.description = data.description;
  if (data.price !== undefined) payload.price = Number(data.price);
  if (data.stock !== undefined) payload.stock = Number(data.stock);

  await Product.update(payload, { where: { id: Number(id) } });
  return await Product.findByPk(Number(id));
}

/**
 * Eliminar un producto
 * @param {number} id - ID del producto a eliminar
 * @returns {Promise<number>} Cantidad de registros eliminados (0 o 1)
 */
async function deleteProduct(id) {
  const count = await Product.destroy({ where: { id: Number(id) } });
  return count;
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
