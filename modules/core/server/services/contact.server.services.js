'use strict';

var mongoose = require('mongoose'),
    
    Contact = mongoose.model('rkcontacts');


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
    Contact.find(function(err,contacts){
        if(err) throw err;
            console.log(contacts);
               callback(contacts);
    });
}
//find contact by id
module.exports.findContactById = function (id,callback) {

   Contact.findById(id, function(err, contact){

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

module.exports.deleteContact = function(id,deletedContact,callback){
    Contact.findByIdAndRemove(id,function(err){
        if(err){
            callback(err);
        }
        callback(deletedContact);
        console.log('contact sucessfully deleted');
    })
}
    
    

    


    
    
    
    
    
    
    
            
            
            
            
        
            










