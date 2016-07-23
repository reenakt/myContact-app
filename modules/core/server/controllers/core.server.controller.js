
'use strict';

var  contactService= require('../services/contact.server.services');

// get all the contacts

module.exports.getContacts = function(req,res){
    contactService.getContacts(function(contacts){
        res.status(200);
        res.json(contacts);
    });
}

module.exports.createContact= function (req,res) {
    var contact = req.body;

    if (!contact) {
        res.status(400);
        res.end("Invalid contact")
    }
    contactService.saveContact(contact, function (err, contact) {
        if (err) {
            console.log("server controller:save contact error: ");
           console.log(err);
            
            res
                .status(400)
                .send({message: "Error: internal error while saving data"})
        } else {
            res
                .status(200)
                .json(contact);
        }
    })


}
    
// To update contact


module.exports.validateContactIdAndForward= function(req,res,next,id){
    var metadata = req.metadata= {};
    metadata.contactId =id;
    
    contactService.findContactById(id,function (err,foundContact){
        if(err){
            next(err);
        }else if(foundContact) {
            metadata.model = foundContact;
            next();
        }else{
            next(new Error('failed to found contact'));
        }
    });
    

}

module.exports.updateContact = function(req,res) {
    var updatedContact = req.body,
         id = req.metadata.contactId;

     contactService.updateContact(id,updatedContact,function (err,contact) {

         if (err) {
             res.status(400)
                 .send({message: "unable to update contact.please try again"})
         } else {
             res
                 .status(200)
                 .json(updatedContact);
         }

     });
}
//to delete contact

module.exports.deleteContact = function(req,res) {
   var deletedContact =req.body;
    var id= req.metadata.contactId;
    
     contactService.deleteContact(id, deletedContact,function(err,contact) {


         if (err) {
             res.status(400)
                 .send({message: "unable to delete contact "})
         } else {
             res.status(200)
                 .json(deletedContact);
         }
     });
}
//query operation

module.exports.getTopContacts = function(req,res){
    
    contactService.getTopContacts(function (err,foundContact) {
        if(err){
            res.status(400)
                .send({message:"Error: unable to find contact"})
        }else{
            res.status(200)
                .json(foundContact);
        }
    });
}
module.exports.findContactByCity = function(req,res){
    var city = req.params.city;
    contactService.findContactByCity(city,function(err,foundContact){
        if(err){
            res.status(400)
                .send({message:"Error: unable to find contact"})
        }else{
            res.status(200)
                .json(foundContact);
        }
    });
}
module.exports.getContactByNum = function(req,res){
    var num= req.params.num;
    contactService.getContactByNum(num,function(err,foundContact){

        if(err){
            res.status(400)
                .send({message:"Error: Unable to find number"})
        }else{
            res.status(200)
                .json(foundContact);
        }

    })
}


















