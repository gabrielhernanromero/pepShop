// Conexión a MySQL con Sequelize
// Configuración desde variables de entorno

const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } = require('../../config/config');

// Crear instancia de Sequelize usando variables de entorno
const conection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	dialect: DB_DIALECT,
	port: parseInt(DB_PORT),
	logging: false,
});

module.exports = conection;
