
const DocFolder         = require('../models/DocFolder');
const Document          = require('../models/Document');
const DocFolderChild    = require('../models/DocFolderChild')
const { mutipleMongooseToObject } = require('../../utils/mongoose');
const { mongooseToObject } = require('../../utils/mongoose');


// multer
var multer = require('multer');
const { base } = require('../models/Employee');
const { header } = require('express/lib/request');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/document')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if (file.mimetype == "application/msword" || file.mimetype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.mimetype == "application/pdf" || file.mimetype == "application/vnd.ms-powerpoint" || file.mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
            cb(null, true)
        } else {
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("txtFile");


class DocumentsController {


    index(req, res) {
        res.render('Document', { layout: 'admin' });
    }

    //Hiển thị folers tài liệu
    showDocFiles(req, res, next) {

        DocFolder.find({})
            .then(docFolder => res.render('docFolderShow', {
                layout: 'admin',
                docfolder: mutipleMongooseToObject(docFolder)
            }))
            .catch(next);

    }

    //Hiển thị form thêm tài liệu
    addDoc(req, res, next) {

        DocFolder.find({})
            .then(category => res.render('addDoc', {
                layout: 'admin',
                category: mutipleMongooseToObject(category)
            }))
            .catch(next);

    }
    // Xử lý thêm tài liệu
    processAddDoc(req, res) {

        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                res.json({ 'kq': 0, 'errMsg': 'A Multer error occurred when uploading.' });
            } else if (err) {
                res.json({ 'kq': 0, 'errMsg': 'An unknown error occurred when uploading.' + err });
            } else {
                // res.send(req.file.filename);
                //save mongo
                var newDoc = Document({
                    Name: req.body.txtName,
                    Node: req.body.txtNode,
                    File: req.file.filename,
                    Creat_by: req.body.txtcreat_by,
                });
                newDoc.save(function (err) {
                    if (err) {
                        res.json({ 'kq': 0, 'errMsg': err });
                    } else {
                        DocFolder.findOneAndUpdate({ _id: req.body.slcCategory }, { $push: { Array_list: newDoc._id } }, function (err) {
                            if (err) {
                                res.json({ 'kq': 0, 'errMsg': err });
                            } else {
                                res.redirect('./tai-lieu/danh-sach-thu-muc')
                            }
                        })
                    }
                })
            }

        });

    }

    docShow(req, res) {
        // DocFolder.find({ _id: req.params.id }).populate('Array_list').then(data => {
        //     // console.log(data.forEach(item => {
        //     //     console.log(item)
        //     // }))
        //     // res.render('docShow', { data, layout: 'admin' });
        //     // render vao day
        //     // console.log(data)
        //     // console.log(data.forEach(item => {console.log(item)}))
        //     res.json(data)
        // }).catch(err => {
        //     res.json({ 'kq': 0, 'errMsg': err });
        // })


        var docFolder = DocFolder.aggregate([{
            $lookup: { 
                from: 'documents',
                localField: 'Array_list',
                foreignField: '_id',
                as: 'docList'
            }
        }], function (err, data) {
            if (err) {
                res.json({ 'kq': 0, 'errMsg': err });
            } else {
                // console.log(data)
                // res.json(data)
                DocFolderChild.find({})
                .then(folderChild => res.render('docShow', {data, docFolder, folderChild:mutipleMongooseToObject(folderChild), layout:'admin'}))
                .catch(err);
                // res.render('docShow', { data, docFolder, layout: 'admin' });
            }
        })
    }


    //Thêm foler tài liệu con
    addFolderChild(req, res, next) {
        DocFolder.find({})
        .then(data => res.render('addFolderChild', {
            layout: 'admin',
            data: mutipleMongooseToObject(data)
        }))
        .catch(next);
        // res.render('addFolderChild', { layout: 'admin' })
    }
    processAddFolderChild(req, res) {
        var newFolderChild = DocFolderChild({
            Name:           req.body.txtDocFolderChild_title,
            Description:    req.body.txtDocFolderChild_desc,
            Array_list: []
        });
        newFolderChild.save(function (err) {
            if (err) {
                res.json({ 'kq': 0, 'errMsg': err });
            } else {
                DocFolder.findOneAndUpdate({_id:req.body.slcDocFolder}, {$push:{Array_folder_child:newFolderChild._id}}, function(err){
                    if (err) {
                        res.json({ 'kq': 0, 'errMsg': err });
                    } else {
                        res.redirect('/tai-lieu');
                    }
                });
            }
        })
    }
}



module.exports = new DocumentsController;