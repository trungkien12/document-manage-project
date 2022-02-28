const express = require('express');
const router = express.Router();
const middlewereController = require('../utils/middlewereController')

const adminController = require('../app/controllers/AdminController');

router.get('/', middlewereController.verifiToken, adminController.index);
module.exports = router;