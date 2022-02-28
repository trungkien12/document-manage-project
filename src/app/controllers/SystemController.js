
const DocFolder   = require('../models/DocFolder');
const Departmnet  = require('../models/department');

class SystemController {
    //------------------------------------------------
    index(req,res) {
        res.render('system', {layout: 'admin'});
    }

    // Giao diện thêm mới file tài liệu
    addNewDocFile(req,res) {
        res.render('addDocFiles', {layout:'admin'});
    }

    // Xử lý thêm mới folder tài liệu
    processAddNewDocFile(req,res) {
        var newDocfolder = DocFolder({
            Name:        req.body.txtDocFolder_title,
            Description: req.body.txtDocFolder_desc,
            Array_list: []
        });
        newDocfolder.save(function(err){
            if(err){
                res.json({'kq':0, 'errMsg':err});
            }else{
                res.redirect('/tai-lieu')
            }
        })
    }

    //Giao diện thêm mới phòng ban
    addNewDepartment(req, res) {
        res.render('addDepartment', {layout: 'admin'});
    }

    //Xử lý tác vụ thêm mới phòng ban
    processAddNewDepartment(req, res) {
        var newDepartment = Departmnet({
            Name: req.body.txtName,
            Description: req.body.txtDesc,
            Array_employee: []
        });
        newDepartment.save(function(err){
            if(err){
                res.json({'kq':0, 'errMsg':err});
            }else{
                res.redirect('/quan-ly-chung')
            }
        })
    }
    //------------------------------------------------
}



module.exports = new SystemController;
