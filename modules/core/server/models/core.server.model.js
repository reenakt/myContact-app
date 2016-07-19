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
        validate:[validateEmailStrategy,'Email cannot be empty']
    },
    email:{
        type:String,
        default:'',
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validateEmailStrategy,'please give the correct email']
    }
});
  mongoose.model('contact',ContactsSchema);
