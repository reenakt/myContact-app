'use strict';

module.exports = function(app){

    var controller = require('../controllers/core.server.controller')



    // contact collection and creation
    app
        .route('/api/contact')
        .get(controller.getContacts)
        .post(controller.createContact)

        //update and delete operations
    app
        .route('/api/contact/:contactId')
        .put(controller.updateContact)
        .delete(controller.deleteContact)
        
    
    app.param('contactId',controller.validateContactIdAndForward);
}
    
