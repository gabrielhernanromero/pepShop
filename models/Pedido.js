const { DataTypes, Model } = require('sequelize');
const conection = require('../conection/conection');

class Pedido extends Model {}

Pedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pendiente',
    },
    clienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id',
      },
    },
  },
  {
    sequelize: conection,
    modelName: 'Pedido',
    tableName: 'pedidos',
    timestamps: true,
  }
);

module.exports = Pedido;
