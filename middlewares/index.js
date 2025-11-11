/**
 * Archivo central para exportar todos los middlewares
 * Facilita las importaciones en otros archivos
 */

const { validateProduct, validateMascota, validateClient, validateTurn, validateOrder } = require('./validationMiddleware');
const { errorHandler, notFoundHandler } = require('./errorMiddleware');
const { requestLogger } = require('./loggerMiddleware');
const { verifyAdminToken } = require('./authMiddleware');

module.exports = {
  validateProduct,
  validateMascota,
  validateClient,
  validateTurn,
  validateOrder,
  errorHandler,
  notFoundHandler,
  requestLogger,
  verifyAdminToken,
};
