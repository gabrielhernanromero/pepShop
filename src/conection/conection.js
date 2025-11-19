// Conexión a MySQL con Sequelize
// Base de datos: pepShop | Usuario: root | Password: root | Host: localhost | Puerto: 8889

const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize (solo exportamos la instancia)
const conection = new Sequelize('pepShop', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: 8889,
});

module.exports = conection;

