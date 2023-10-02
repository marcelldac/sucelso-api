const express = require('express');
const router = express.Router();

const teacherController = require('../controller/teacherController');

router.get('/', teacherController.read);
router.get('/:id', teacherController.readById);
router.post('/', teacherController.create);
router.put('/:id', teacherController.update);
router.delete('/:id', teacherController.delete);

module.exports = router;