'use strict';

var mongoose = require('mongoose'),

    Contact = mongoose.model('reenaContact');


module.exports.saveContact = function(savableContact,callback){
    var contact = new Contact(savableContact);


    contact.save(function (err) {
            if(err){
                callback(err);
            }
            callback(null,contact);
    });

}

// get all the contact

module.exports.getContacts = function(callback){

    Contact.find({},{__v:0},function(err,contacts){

        if(err) throw err;

               callback(null,contacts);
    });
}

//get contact by id

module.exports.getContactById = function(id,contact,callback){


    Contact.findOne({'_id':id},function (err,contact) {
        if(err)
            callback(err);
        else
        callback(null,contact);
    })
}



//find contact by id

module.exports.findContactById = function (id,callback) {

   Contact.findOne({'_id':id}, function(err, contact){

       if(err) throw err;

       callback(contact);
   });

}
module.exports.updateContact = function(id,updatedContact,callback){

    Contact.findByIdAndUpdate(id,updatedContact,function(err,contact){
        if(err) {
            callback (err);
        }
        callback(null,contact);
    });

}

module.exports.deleteContact = function(id,callback) {
    Contact.findByIdAndRemove(id, function (err) {
        if (err) {
            callback(err);
        }else
        Contact.find({}, {__v:0}, function(err, contact){
                if(err) callback(err);
                else callback(null, contact);

            })



    });

}
    
    
// Query to get top 10 customer 

module.exports.getTopContacts = function(callback){
    
Contact.find({}).limit(10).sort('firstName').exec(function (err,contact){

    if(err) {callback (err);}
    
    console.log(contact);
    callback(null,contact);
    
});

}
    
//Give all phone number along with firstName in Fremont city

    module.exports.findContactByCity= function (city,callback) {

        var result,
            foundContact = [];

        Contact.find({}).where('city').equals('FREMONT').exec(function(err,contact){
             if(err){
                 callback(err);
             }else {

                 for (var i = 0; i < contact.length; i++) {
                     result = {
                         Name: contact[i].firstName,
                         phone: contact[i].phone,
                         city: contact[i].city};
                     
           foundContact.push(result);
                 }
               console.log(foundContact);
                 callback(null,foundContact);

             }
        });
        
    }

// Give all contacts start with telephone number 408
    
    module.exports.getContactByNum= function (num,callback) {

      var result, mobile = num.substr(0,3),
          foundContact= [];

        console.log(mobile);
        
        Contact.find({phone:{$regex:mobile}}).exec(function(err,contact){

            if(err){
                callback(err);
            }else{
                for(var i=0;i<contact.length;i++){
                    result ={Name: contact[i].firstName,phone:contact[i].phone};
                   foundContact.push(result);
                }
                console.log(foundContact);

                callback(null,foundContact);
            }
        });

    }
    
    
    
            
            
            
            
        
            










