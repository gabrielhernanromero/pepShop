/**
 * Servicio de Mascotas
 * Contiene la lógica de negocio para operaciones CRUD de mascotas
 * Interactúa directamente con el modelo Mascota y la base de datos
 */

const Mascota = require('../../models/Mascota');
const Cliente = require('../../models/Cliente');

/**
 * Listar todas las mascotas
 * Incluye información del propietario (Cliente) en cada registro
 * @returns {Promise<Array>} Array de mascotas con datos del propietario
 */
async function listMascotas() {
  return await Mascota.findAll({ include: [{ model: Cliente, as: 'propietario' }] });
}

/**
 * Obtener una mascota específica por ID
 * Incluye información del propietario
 * @param {number} id - ID de la mascota
 * @returns {Promise<Object|null>} Objeto de mascota o null si no existe
 */
async function getMascota(id) {
  return await Mascota.findByPk(Number(id), { include: [{ model: Cliente, as: 'propietario' }] });
}

/**
 * Crear una nueva mascota
 * Valida y normaliza los datos de entrada
 * @param {Object} data - Datos de la mascota { name, species, breed, age, clienteId }
 * @returns {Promise<Object>} Objeto de mascota creada
 * @throws {Error} Si hay error en la creación
 */
async function createMascota(data) {
  const payload = {
    name: data.name,
    species: data.species,
    breed: data.breed || null,
    age: data.age !== undefined ? Number(data.age) : null,
    clienteId: data.clienteId ? Number(data.clienteId) : null,
  };
  return await Mascota.create(payload);
}

/**
 * Actualizar una mascota existente
 * Solo actualiza los campos proporcionados
 * @param {number} id - ID de la mascota a actualizar
 * @param {Object} data - Campos a actualizar
 * @returns {Promise<Object>} Mascota actualizada con datos recientes
 */
async function updateMascota(id, data) {
  const payload = {};
  if (data.name !== undefined) payload.name = data.name;
  if (data.species !== undefined) payload.species = data.species;
  if (data.breed !== undefined) payload.breed = data.breed;
  if (data.age !== undefined) payload.age = Number(data.age);
  if (data.clienteId !== undefined) payload.clienteId = Number(data.clienteId);

  await Mascota.update(payload, { where: { id: Number(id) } });
  return await Mascota.findByPk(Number(id));
}

/**
 * Eliminar una mascota
 * @param {number} id - ID de la mascota a eliminar
 * @returns {Promise<number>} Cantidad de registros eliminados (0 o 1)
 */
async function deleteMascota(id) {
  const count = await Mascota.destroy({ where: { id: Number(id) } });
  return count;
}

module.exports = {
  listMascotas,
  getMascota,
  createMascota,
  updateMascota,
  deleteMascota,
};
