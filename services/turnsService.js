/**
 * Servicio de Turnos
 * Contiene la lógica de negocio para operaciones CRUD de turnos/citas
 * Gestiona el agendamiento de citas para clientes
 */

const { Turno, Cliente } = require('../models');

/**
 * Listar todos los turnos
 * Incluye información del cliente asociado a cada turno
 * @returns {Promise<Array>} Array de todos los turnos con datos del cliente
 */
async function listTurns() {
  return await Turno.findAll({ include: [{ model: Cliente, as: 'cliente' }] });
}

/**
 * Obtener un turno específico por ID
 * Incluye información del cliente
 * @param {number} id - ID del turno
 * @returns {Promise<Object|null>} Objeto de turno o null si no existe
 */
async function getTurn(id) {
  return await Turno.findByPk(Number(id), { include: [{ model: Cliente, as: 'cliente' }] });
}

/**
 * Crear un nuevo turno
 * Valida y normaliza los datos de entrada
 * @param {Object} data - Datos del turno { dateTime, reason, status, clienteId }
 * @returns {Promise<Object>} Objeto de turno creado
 * @throws {Error} Si hay error en la creación
 */
async function createTurn(data) {
  const payload = {
    dateTime: data.dateTime,
    reason: data.reason || null,
    status: data.status || 'pendiente',
    clienteId: data.clienteId ? Number(data.clienteId) : null,
  };
  return await Turno.create(payload);
}

/**
 * Actualizar un turno existente
 * Solo actualiza los campos proporcionados
 * @param {number} id - ID del turno a actualizar
 * @param {Object} data - Campos a actualizar (dateTime, reason, status, clienteId)
 * @returns {Promise<Object>} Turno actualizado con datos recientes
 */
async function updateTurn(id, data) {
  const payload = {};
  if (data.dateTime !== undefined) payload.dateTime = data.dateTime;
  if (data.reason !== undefined) payload.reason = data.reason;
  if (data.status !== undefined) payload.status = data.status;
  if (data.clienteId !== undefined) payload.clienteId = Number(data.clienteId);

  await Turno.update(payload, { where: { id: Number(id) } });
  return await Turno.findByPk(Number(id));
}

/**
 * Eliminar un turno
 * @param {number} id - ID del turno a eliminar
 * @returns {Promise<number>} Cantidad de registros eliminados (0 o 1)
 */
async function deleteTurn(id) {
  const count = await Turno.destroy({ where: { id: Number(id) } });
  return count;
}

module.exports = {
  listTurns,
  getTurn,
  createTurn,
  updateTurn,
  deleteTurn,
};
