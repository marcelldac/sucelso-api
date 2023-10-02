const express = require('express');
const router = express.Router();

const pubsController = require('../controller/pubsController');

router.get('/', pubsController.read);
router.get('/:id', pubsController.readById);
router.post('/', pubsController.create);
router.put('/:id', pubsController.update);
router.delete('/:id', pubsController.delete);

module.exports = router;