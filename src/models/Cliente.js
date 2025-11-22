const { DataTypes, Model } = require('sequelize');
const conection = require('../conection/conection');
const bcrypt = require('bcrypt');

class Cliente extends Model {
  static async decodeVerifyPass(myPlaintextPassword, hash) {
    return bcrypt.compare(myPlaintextPassword, hash);
  }
}

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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
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

// Hook para hashear password antes de crear el registro
Cliente.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(user.password, salt);
    user.salt = salt;
    user.password = hashed;
  }
});

// Método de instancia para comparar password en futuros logins
Cliente.prototype.verifyPassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = Cliente;
