const express= require('express');
const router = express.Router();
const middlewereController = require('../utils/middlewereController')

const SystemController = require('../app/controllers/SystemController');

router.post('/', SystemController.processAddNewDocFile);
router.post('/them-phong', SystemController.processAddNewDepartment);

router.get('/them-folder-tai-lieu', middlewereController.verifiToken,SystemController.addNewDocFile);
router.get('/them-phong', middlewereController.verifiToken, SystemController.addNewDepartment);
router.get('/', middlewereController.verifiToken, SystemController.index);

module.exports = router;