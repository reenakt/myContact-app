'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
validator =require('validator');

var validateFieldStrategy = function (property) {
    return property.length;
}

var validateEmailStrategy = function(property){
   return validator.isEmail(property);
}

var validatePhoneStrategy = function (property) {
    return /\d{3}-\d{3}-\d{4}/.test(property);
}


var ContactsSchema = new Schema({

    firstName:{
        type:String,
        default:'',
        trim:true,
        validate:[validateFieldStrategy,'First name cannot be empty']
    },

    lastName:{
        type:String,
        default:'',
        trim:true,
        validate:[validateFieldStrategy,'last name cannot be empty']
    },
    email:{
        type:String,
        default:'',
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validateEmailStrategy,'please give the correct email']
    },
    phone:{
        type: String,
        trim:true,
        unique:true,
        default:'',
        validate:[validatePhoneStrategy,'phone number is invalid']
    },
    city:{
        type:String,
        trim:true,
        default:'',
        uppercase:true,
        validate:[validateFieldStrategy,'City can not be empty']
    }
     
    
});
  mongoose.model('rkcontacts',ContactsSchema);
