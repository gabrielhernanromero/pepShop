/**
 * Modelos Sequelize - Definición de entidades y asociaciones
 * Este archivo configura la conexión a la base de datos SQLite y define
 * todos los modelos (tablas) con sus campos y relaciones.
 */

const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Obtener la ruta del archivo SQLite desde .env (DATABASE_URL="file:./dev.db")
const dbFile = process.env.DATABASE_URL ? process.env.DATABASE_URL.replace('file:', '') : './dev.db';

/**
 * Inicializar Sequelize con SQLite
 * - dialect: 'sqlite' - Usa base de datos SQLite (ideal para desarrollo)
 * - storage: ruta al archivo .db
 * - logging: false - No mostrar queries SQL en consola (cambiar a true para debug)
 */
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFile,
  logging: false,
});

/**
 * Modelo: Product
 * Representa los productos disponibles en la tienda de mascotas
 * Campos:
 *  - id: identificador único (PK, auto-incrementado)
 *  - name: nombre del producto (requerido)
 *  - description: descripción detallada (opcional)
 *  - price: precio unitario (default: 0)
 *  - stock: cantidad disponible (default: 0)
 *  - timestamps: createdAt, updatedAt (automáticos)
 */
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
  timestamps: true,
});

/**
 * Modelo: Mascota
 * Representa las mascotas registradas en la tienda (perros, gatos, etc.)
 * Se asocia a un Cliente (propietario)
 * Campos:
 *  - id: identificador único (PK, auto-incrementado)
 *  - name: nombre de la mascota (requerido)
 *  - species: especie (perro, gato, etc.) (requerido)
 *  - breed: raza (opcional)
 *  - age: edad en años (opcional)
 *  - clienteId: referencia al Cliente propietario (FK, requerido)
 *  - timestamps: createdAt, updatedAt (automáticos)
 */
const Mascota = sequelize.define('Mascota', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  species: { type: DataTypes.STRING, allowNull: false },
  breed: { type: DataTypes.STRING, allowNull: true },
  age: { type: DataTypes.INTEGER, allowNull: true },
}, {
  timestamps: true,
});

/**
 * Modelo: Cliente
 * Representa a los clientes/propietarios de mascotas
 * Campos:
 *  - id: identificador único (PK, auto-incrementado)
 *  - name: nombre completo del cliente (requerido)
 *  - email: correo electrónico (opcional)
 *  - phone: número de teléfono (opcional)
 *  - timestamps: createdAt, updatedAt (automáticos)
 */
const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true },
}, {
  timestamps: true,
});

/**
 * Modelo: Turno
 * Representa los turnos/citas que un Cliente agenda en la tienda
 * Campos:
 *  - id: identificador único (PK, auto-incrementado)
 *  - dateTime: fecha y hora del turno (requerido)
 *  - reason: motivo de la cita (ej: baño, vacuna) (opcional)
 *  - status: estado del turno (pendiente, completado, cancelado) (default: 'pendiente')
 *  - clienteId: referencia al Cliente que agenda el turno (FK, requerido)
 *  - timestamps: createdAt, updatedAt (automáticos)
 */
const Turno = sequelize.define('Turno', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dateTime: { type: DataTypes.DATE, allowNull: false },
  reason: { type: DataTypes.STRING, allowNull: true },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pendiente' },
}, {
  timestamps: true,
});

/**
 * Modelo: Pedido
 * Representa las órdenes de compra de productos realizadas por Clientes
 * Campos:
 *  - id: identificador único (PK, auto-incrementado)
 *  - total: monto total de la orden
 *  - status: estado del pedido (pendiente, completado, cancelado) (default: 'pendiente')
 *  - clienteId: referencia al Cliente que realiza la compra (FK, requerido)
 *  - timestamps: createdAt, updatedAt (automáticos)
 */
const Pedido = sequelize.define('Pedido', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  total: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pendiente' },
}, {
  timestamps: true,
});

/**
 * ASOCIACIONES ENTRE MODELOS
 * Define las relaciones One-to-Many y Many-to-One entre las entidades
 */

// Un Cliente puede tener muchos Turnos; cada Turno pertenece a un Cliente
Cliente.hasMany(Turno, { foreignKey: 'clienteId', as: 'turnos' });
Turno.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Un Cliente puede tener muchos Pedidos; cada Pedido pertenece a un Cliente
Cliente.hasMany(Pedido, { foreignKey: 'clienteId', as: 'pedidos' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Un Cliente puede tener muchas Mascotas; cada Mascota pertenece a un Cliente
// La relación inversa permite acceder a las mascotas de un cliente
Cliente.hasMany(Mascota, { foreignKey: 'clienteId', as: 'mascotas' });
Mascota.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'propietario' });

/**
 * Exportar la instancia de Sequelize y todos los modelos
 * Estos se usan en los servicios, controladores y en index.js para sincronizar la BD
 */
module.exports = {
  sequelize,
  Product,
  Mascota,
  Cliente,
  Turno,
  Pedido,
};
