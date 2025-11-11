const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController');
const { validateOrder } = require('../middlewares');

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validateOrder, controller.create);
router.put('/:id', validateOrder, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
