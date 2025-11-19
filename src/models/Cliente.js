const { DataTypes, Model } = require('sequelize');
const conection = require('../conection/conection');

class Cliente extends Model {}

Cliente.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: conection,
    modelName: 'Cliente',
    tableName: 'clientes',
    timestamps: true,
  }
);

module.exports = Cliente;
