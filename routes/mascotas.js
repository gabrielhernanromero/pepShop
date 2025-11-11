const express = require('express');
const router = express.Router();
const controller = require('../controllers/mascotasController');
const { validateMascota } = require('../middlewares');

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validateMascota, controller.create);
router.put('/:id', validateMascota, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
