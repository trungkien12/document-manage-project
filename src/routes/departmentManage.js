const express= require('express');
const router = express.Router();

const SystemController = require('../app/controllers/SystemController');

router.post('/them-phong', SystemController.processAddNewDepartment);

module.exports = router;