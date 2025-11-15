const { DataTypes, Model } = require('sequelize');
const conection = require('../conection/conection');

class Mascota extends Model {}

Mascota.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: 'Mascota',
    tableName: 'mascotas',
    timestamps: true,
  }
);

module.exports = Mascota;
