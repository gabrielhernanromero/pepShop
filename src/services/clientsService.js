/**
 * Servicio de Clientes
 * Contiene la lógica de negocio para operaciones CRUD de clientes
 * Gestiona información de propietarios de mascotas y compradores
 */

const Cliente = require('../../src/models/Cliente');

/**
 * Listar todos los clientes
 * @returns {Promise<Array>} Array de todos los clientes registrados
 */
async function listClients() {
  return await Cliente.findAll();
}

/**
 * Obtener un cliente específico por ID
 * @param {number} id - ID del cliente
 * @returns {Promise<Object|null>} Objeto de cliente o null si no existe
 */
async function getClient(id) {
  return await Cliente.findByPk(Number(id));
}

/**
 * Crear un nuevo cliente
 * Valida y normaliza los datos de entrada
 * @param {Object} data - Datos del cliente { name, email, phone }
 * @returns {Promise<Object>} Objeto de cliente creado
 * @throws {Error} Si hay error en la creación
 */
async function createClient(data) {
  const payload = {
    name: data.name,
    email: data.email || null,
    phone: data.phone || null,
  };
  return await Cliente.create(payload);
}

/**
 * Actualizar un cliente existente
 * Solo actualiza los campos proporcionados
 * @param {number} id - ID del cliente a actualizar
 * @param {Object} data - Campos a actualizar (name, email, phone)
 * @returns {Promise<Object>} Cliente actualizado con datos recientes
 */
async function updateClient(id, data) {
  const payload = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.email !== undefined) payload.email = data.email;
  if (data.phone !== undefined) payload.phone = data.phone;

  await Cliente.update(payload, { where: { id: Number(id) } });
  return await Cliente.findByPk(Number(id));
}

/**
 * Eliminar un cliente
 * @param {number} id - ID del cliente a eliminar
 * @returns {Promise<number>} Cantidad de registros eliminados (0 o 1)
 */
async function deleteClient(id) {
  const count = await Cliente.destroy({ where: { id: Number(id) } });
  return count;
}

module.exports = {
  listClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
