
// Importing modules
const mongoose = require('mongoose');
var crypto = require('crypto');

let userSchema = new mongoose.Schema({
    name:{
       type: String,
       required: true
    },
    password: {
       type: String,
       required: true
    }
 },{
    timestamps: true,
    collection: 'users'
 })
 module.exports = mongoose.model('User', userSchema);