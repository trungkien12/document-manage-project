const express= require('express');
const router = express.Router();
const middlewereController = require('../utils/middlewereController')

const DocumentsController = require('../app/controllers/DocumentsController');

router.post('/them-folder', DocumentsController.processAddFolderChild);
router.post('/', DocumentsController.processAddDoc);

router.get('/them-tai-lieu', middlewereController.verifiToken, DocumentsController.addDoc);
router.get('/', middlewereController.verifiToken, DocumentsController.showDocFiles);
router.get('/danh-sach-tai-lieu/:id', middlewereController.verifiToken, DocumentsController.docShow);
router.get('/them-folder', middlewereController.verifiToken, DocumentsController.addFolderChild);

// router.get('/', middlewereController.verifiToken, DocumentsController.index);


module.exports = router;