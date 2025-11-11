/**
 * Servicio de Pedidos (Órdenes)
 * Contiene la lógica de negocio para operaciones CRUD de pedidos de compra
 * Gestiona órdenes de productos realizadas por clientes
 */

const { Pedido, Cliente } = require('../models');

/**
 * Listar todos los pedidos
 * Incluye información del cliente que realizó la compra
 * @returns {Promise<Array>} Array de todos los pedidos con datos del cliente
 */
async function listOrders() {
  return await Pedido.findAll({ include: [{ model: Cliente, as: 'cliente' }] });
}

/**
 * Obtener un pedido específico por ID
 * Incluye información del cliente
 * @param {number} id - ID del pedido
 * @returns {Promise<Object|null>} Objeto de pedido o null si no existe
 */
async function getOrder(id) {
  return await Pedido.findByPk(Number(id), { include: [{ model: Cliente, as: 'cliente' }] });
}

/**
 * Crear un nuevo pedido
 * Valida y normaliza los datos de entrada
 * @param {Object} data - Datos del pedido { total, status, clienteId }
 * @returns {Promise<Object>} Objeto de pedido creado
 * @throws {Error} Si hay error en la creación
 */
async function createOrder(data) {
  const payload = {
    total: Number(data.total) || 0,
    status: data.status || 'pendiente',
    clienteId: data.clienteId ? Number(data.clienteId) : null,
  };
  return await Pedido.create(payload);
}

/**
 * Actualizar un pedido existente
 * Solo actualiza los campos proporcionados
 * @param {number} id - ID del pedido a actualizar
 * @param {Object} data - Campos a actualizar (total, status, clienteId)
 * @returns {Promise<Object>} Pedido actualizado con datos recientes
 */
async function updateOrder(id, data) {
  const payload = {};
  if (data.total !== undefined) payload.total = Number(data.total);
  if (data.status !== undefined) payload.status = data.status;
  if (data.clienteId !== undefined) payload.clienteId = Number(data.clienteId);

  await Pedido.update(payload, { where: { id: Number(id) } });
  return await Pedido.findByPk(Number(id));
}

/**
 * Eliminar un pedido
 * @param {number} id - ID del pedido a eliminar
 * @returns {Promise<number>} Cantidad de registros eliminados (0 o 1)
 */
async function deleteOrder(id) {
  const count = await Pedido.destroy({ where: { id: Number(id) } });
  return count;
}

module.exports = {
  listOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
