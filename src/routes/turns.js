const express = require('express');
const router = express.Router();
const controller = require('../controllers/turnsController');
const { validateTurn } = require('../middlewares');

router.get('/', controller.list);
router.get('/:id', controller.getById);
router.post('/', validateTurn, controller.create);
router.put('/:id', validateTurn, controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
