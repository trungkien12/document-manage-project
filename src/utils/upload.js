// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./src/public/upload")
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) +'.'+ file.originalname.split('.').pop()
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({ storage: storage })

// module.exports = upload;



// multer
// var multer  = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'public/upload')
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now()  + "-" + file.originalname)
//     }
// });  
// var upload = multer({ 
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         console.log(file);
//         if(file.mimetype=="image/bmp" || file.mimetype=="image/png" || file.mimetype=="image/jpeg" || file.mimetype=="image/jpg" || file.mimetype=="image/gif"){
//             cb(null, true)
//         }else{
//             return cb(new Error('Only image are allowed!'))
//         }
//     }
// }).single("txtAvatar");


