const Employee = require('../models/Employee');
const Department  = require('../models/department');
const { mutipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');


// multer
var multer  = require('multer');
const { base } = require('../models/Employee');
const { header } = require('express/lib/request');
const department = require('../models/department');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpeg" || file.mimetype=="image/jpg" || file.mimetype=="image/gif"){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("txtAvatar");


class EmployeesController {

    index(req,res) {
        res.render('employees', {layout:'admin'});
    }

    //Hàm show danh sách phòng ban
    show(req,res,next) {
        Department.find({})
            .then(department => res.render('departmentShow', { 
                layout: 'admin',
                department: mutipleMongooseToObject(department)
             }))
            .catch(next);
    }

    //Hàm show danh sách nhân viên tương ứng với phòng ban
    showEmployee(req,res,next) {

        var department = Department.aggregate([{
            $lookup: {
                from:           'employees',
                localField:     'Array_employees',
                foreignField:   '_id',
                as:             'employeesList'
            }
        }], function(err, char){
            if(err) {
                res.json({'kq':0, 'errMsg':err});
            }else {
                res.render('employeesShow', {char, department,  layout: 'admin'});
            }
        })


        // Department.findById(req.params.id, function(err, data){
        //     if(err){
        //         res.json({'kq':0, 'errMsg':err});
        //     }else{
        //         res.render('example', {data,  layout: 'admin'});
        //     }
        // })
    }

    //Hàm show form thêm mới nhân viên
    addEmployee(req, res, next) {

        Department.find({})
        .then(department => res.render('addEmployees', { 
            layout: 'admin',
            department: mutipleMongooseToObject(department)
         }))
        .catch(next);

    }

    //Hàm xử lý thêm nhân viên
    processUpload(req, res) {
        
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
              res.json({'kq':0, 'errMsg': 'A Multer error occurred when uploading.'}); 
            } else if (err) {
              res.json({'kq':0, 'errMsg': 'An unknown error occurred when uploading.' + err}); 
            }else{
                // Save mongo (req.file.filename)
                var employee = Employee({
                    Hoten:         req.body.txtName,
                    Phongban:      req.body.slcDepartments,
                    Gioitinh:      req.body.txtGioitinh,
                    Ngaysinh:      req.body.txtNgaysinh,
                    Cmnd:          req.body.txtCmnd,
                    Ngaycap:       req.body.txtNgaycap,
                    Noicap:        req.body.txtNoicap,
                    Quequan:       req.body.txtQuequan,
                    Email:         req.body.txtEmail,
                    Dienthoai:     req.body.txtDienthoai,
                    Username:      req.body.txtUsername,
                    Password:      req.body.txtPassword,
                    Avatar:        req.file.filename,

                });
                employee.save(function(err){
                    if(err){
                        res.json({'kq':0, 'errMsg':err});
                    }else{
                        Department.findOneAndUpdate({_id: req.body.slcDepartments}, {$push: {Array_employees: employee._id}}, function(err){
                            if(err){
                                res.json({'kq':0, 'errMsg':err});
                            }else{
                                res.redirect('/nhan-vien')
                            }
                        })
                    }
                });
            }
    
        });

    }

    //Hàm render form sửa thông tin nhân viên
    editEmployee(req, res){

        Employee.findById(req.params.id, function(err, data){
            if(err) {
                res.json({'kq':0, 'errMsg':err});
            }else {
                res.render('editEmployee', { layout: 'admin', data:mongooseToObject(data) });
            }
        })

    }

    //Hàm xử lý việc sửa thông tin nhân viên
    processEditEmployee(req, res) {
        //Check xem khách hàng có chọn file mới hay không?
        //1. Có chọn file mới
        //2. Không file mới
        upload(req, res, function (err) {

            if(!req.file){
                Employee.updateOne( {_id: req.body.IDChar}, {
                    Hoten:         req.body.txtName,
                    Gioitinh:      req.body.txtGioitinh,
                    Ngaysinh:      req.body.txtNgaysinh,
                    Cmnd:          req.body.txtCmnd,
                    Ngaycap:       req.body.txtNgaycap,
                    Noicap:        req.body.txtNoicap,
                    Quequan:       req.body.txtQuequan,
                    Email:         req.body.txtEmail,
                    Dienthoai:     req.body.txtDienthoai,
                    Username:      req.body.txtUsername,
                    Password:      req.body.txtPassword
                }, function(err) {
                    if(err) {
                        res.json({'kq':0, 'errMsg':err});
                    }else {
                        res.redirect('../nhan-vien/danh-sach')
                    
                    }
                } )
            }else{

            if (err instanceof multer.MulterError) {
              res.json({'kq':0, 'errMsg': 'A Multer error occurred when uploading.'}); 
            } else if (err) {
              res.json({'kq':0, 'errMsg': 'An unknown error occurred when uploading.' + err}); 
            }else{
                //Upload mongo (req.file.filename)
                Employee.updateOne( {_id: req.body.IDChar}, {
                    Hoten:         req.body.txtName,
                    Gioitinh:      req.body.txtGioitinh,
                    Ngaysinh:      req.body.txtNgaysinh,
                    Cmnd:          req.body.txtCmnd,
                    Ngaycap:       req.body.txtNgaycap,
                    Noicap:        req.body.txtNoicap,
                    Quequan:       req.body.txtQuequan,
                    Email:         req.body.txtEmail,
                    Dienthoai:     req.body.txtDienthoai,
                    Avatar:        req.file.filename,
                    Team_id:       req.body.txtTeam_id,
                    Doituong_id:   req.body.txtDoituong_id
                }, function(err) {
                    if(err) {
                        res.json({'kq':0, 'errMsg':err});
                    }else {
                        res.redirect('../phong-ban')
                    
                    }
                } )
            }
        }
        });

    }



    //Hàm xử lý tác vụ xoá nhân viên
    deleteEmployee(req, res) {
        Employee.deleteOne({_id: req.params.id}, function(err){
            if(err) {
                res.json({'kq':0, 'errMsg':err});
            }else {
                res.redirect('../../nhan-vien')
            
            }
        })
    }
}



module.exports = new EmployeesController;
