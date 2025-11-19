const { DataTypes, Model } = require('sequelize');
const conection = require('../conection/conection');

class Turno extends Model {}

Turno.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
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
    modelName: 'Turno',
    tableName: 'turnos',
    timestamps: true,
  }
);

module.exports = Turno;
