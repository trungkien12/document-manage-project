const express = require('express');
const router = express.Router();
const middlewereController = require('../utils/middlewereController')

const EmployeesController = require('../app/controllers/EmployeesController');


//Xử lý upload avatar
router.post('/', EmployeesController.processUpload);
//xử lý sửa thông tin nhân viên
router.post('/sua-thong-tin-nv', EmployeesController.processEditEmployee)
//Xử lý 'xoá nhân viên'
router.get('/xoa-nhan-vien/:id', middlewereController.verifiToken, EmployeesController.deleteEmployee);

//-----------------------------------------------------------------------
//Thêm nhân viên
router.get('/them-nhan-vien', middlewereController.verifiToken, EmployeesController.addEmployee);
//Sửa thông tin nhân viên
router.get('/sua-thong-tin-nv/:id', middlewereController.verifiToken, EmployeesController.editEmployee);
//Danh sách phòng ban
router.get('/', middlewereController.verifiToken, EmployeesController.show);
//Danh sách nhân viên tương ứng với phòng ban
router.get('/tat-ca-nv/:id', middlewereController.verifiToken, EmployeesController.showEmployee);
//Trang index
// router.get('/', middlewereController.verifiToken, EmployeesController.index);


module.exports = router;