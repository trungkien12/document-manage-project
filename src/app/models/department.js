const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaDepartment = new Schema({

    Name: String,
    Description: String,
    Array_employees: [{type:mongoose.Schema.Types.ObjectId}]

});

module.exports = mongoose.model('Department', schemaDepartment);