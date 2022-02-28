const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');

router.get('/',  loginController.index);
router.post('/', loginController.processLogin);

module.exports = router;