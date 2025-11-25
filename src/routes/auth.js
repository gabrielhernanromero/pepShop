const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

// Ruta de autenticación
// POST /api/auth/login -> retorna token JWT si credenciales válidas
router.post('/login', login);

module.exports = router;
