
const mongoose = require('mongoose');

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/DocManage_project');
        console.log('connect is successfully!');
    } 
    catch (error) {
        console.log('Connect is failure!');
    }

}

module.exports = { connect }