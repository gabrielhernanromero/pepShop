const express = require('express');
const router = express.Router();
const controller = require('../controllers/clientsController');
const { validateClient } = require('../middlewares');

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validateClient, controller.create);
router.put('/:id', validateClient, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
