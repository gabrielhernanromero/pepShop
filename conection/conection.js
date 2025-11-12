// Conexión a MySQL con Sequelize
// Base de datos: pepShop | Usuario: root | Password: root | Host: localhost | Puerto: 8889

const { Sequelize } = require('sequelize');

// Crear instancia de Sequelize
const conection = new Sequelize('pepShop', 'root', 'root', {
	host: 'localhost',
	dialect: 'mysql',
	port: 8889,
});

// Probar autenticación
(async () => {
	try {
		await conection.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

module.exports = conection;

