
'use strict';


var mockService = require('../utils/core.server.mock'),
   contactService= require('../services/contact.server.services');


module.exports.getContacts = function(req,res){
    
    res.status(200);
    res.json(mockService.getContacts);
    
}
module.exports.createContact= function (req,res) {
    var contact = req.body;
    console.log(contact);
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
            res.status(200);
            res.json(contact);
        }
    })


}
    
// To update contact


module.exports.validateContactIdAndForward= function(req,res,next,id){
    var metadata = req.metadata= {};
    metadata.contactId =id;
    var foundContact = mockService.findContactById(id);
    if(foundContact){
        metadata.model =foundContact.contact;
        metadata.index = foundContact.index;
    }

    if(!metadata.model){
        res
            .status(400)
            .send({massage:'Error: unable to find contact with id'+id})
    }
    next();
}



module.exports.updateContact = function(req,res) {

    var updatedContact = req.body,
        
        index =req.metadata.index;

    var isUpdated = mockService.updateContact(index, updatedContact);
    if (!isUpdated) {
        res.status(400)
            .send({message: "unable to update contact.please try again"})
    } else {
        res.status(200)
            .json(updatedContact);
    }
}
//to delete contact

module.exports.deleteContact = function(req,res){
    
    var contactID = req.metadata.contactId,
        deletedContact = req.body;

    
    var isDeleted = mockService.deleteContact(contactID,deletedContact);
    
    
    if(!isDeleted){
        res.status(400)
            .send({message:"unable to delete contact "})
    }else{
        res.status(200)
            .json(deletedContact);
    }
    console.log(deletedContact);
}
