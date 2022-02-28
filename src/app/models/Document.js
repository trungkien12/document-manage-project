
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaDocument = new Schema({

    Name: String,
    Node: String,
    File: String,
    Create_by: String,
    Creted: { type: Date, default:Date.now }
});

module.exports = mongoose.model('Document', schemaDocument);