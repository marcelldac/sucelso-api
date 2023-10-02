const express = require('express');
const router = express.Router();

const loginController = require('../controller/loginController');

router.post('/user', loginController.user);
router.post('/teacher', loginController.teacher);
router.post('/coordinator', loginController.coordinator);

module.exports = router;