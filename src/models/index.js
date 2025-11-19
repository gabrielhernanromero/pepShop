// Importar todos los modelos
const Product = require('./Product');
const Cliente = require('./Cliente'); 
const Mascota = require('./Mascota'); 
const Turno = require('./Turno'); 
const Pedido = require('./Pedido');

const { Sequelize, DataTypes } = require('sequelize');

// Definir asociaciones entre modelos

Cliente.hasMany(Mascota, { foreignKey: 'clienteId', as: 'mascotas' });

Mascota.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'propietario' });

Cliente.hasMany(Turno, { foreignKey: 'clienteId', as: 'turnos' });

Turno.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

Cliente.hasMany(Pedido, { foreignKey: 'clienteId', as: 'pedidos' });

Pedido.belongsTo(Cliente, { foreignKey: 'clienteId', as: 'cliente' });

// Exportar todos los modelos
const conection = require('../conection/conection');

module.exports = {
  sequelize: conection,
  Product,
  Cliente,
  Mascota,
  Turno,
  Pedido,
};
