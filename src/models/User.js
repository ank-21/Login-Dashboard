const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    address:{
        type:String
    }
})


const User = mongoose.model('user',userSchema);
module.exports = User;