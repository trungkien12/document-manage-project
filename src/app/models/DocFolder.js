const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaDocFiles = new Schema({

    Name: String,
    Description: String,
    Array_folder_child: [{type:mongoose.Schema.Types.ObjectId}],
    Array_list: [{type:mongoose.Schema.Types.ObjectId, ref: "Document"}]
    // Array_list: [{type:mongoose.Schema.Types.ObjectId}]

});

module.exports = mongoose.model('DocFolder', schemaDocFiles);