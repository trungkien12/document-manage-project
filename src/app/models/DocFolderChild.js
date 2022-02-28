const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaDocFolderChild = new Schema({

    Name: String,
    Description: String,
    Array_list: [{type:mongoose.Schema.Types.ObjectId}]

});

module.exports = mongoose.model('DocFolderChild', schemaDocFolderChild);