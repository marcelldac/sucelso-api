const express = require('express');
const router = express.Router();

const subjectController = require('../controller/subjectController');

router.get('/', subjectController.read);
router.get('/:id', subjectController.readById);
router.post('/', subjectController.create);
router.put('/:id', subjectController.update);
router.delete('/:id', subjectController.delete);

module.exports = router;