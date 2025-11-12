const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');
const { validateProduct } = require('../middlewares');

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validateProduct, controller.create);
router.put('/:id', validateProduct, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
