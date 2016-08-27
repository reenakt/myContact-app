'use strict';

module.exports = function(app){

    var controller = require('../controllers/core.server.controller'),
        mainController=require('../controllers/main.server.controller'),

        userController = require('../controllers/user.server.controller'),
           passport = require('passport');



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
        .get(controller.getContactById)
        
    
    app.param('contactId',controller.validateContactIdAndForward);
    
    
    // to query

    app
        .route('/api/topcontacts')
        .get(controller.getTopContacts)
    app
        .route('/api/city/:city')
        .get(controller.findContactByCity)
    app
        .route('/api/areacode/:num')
        .get(controller.getContactByNum)
            

    app
        .route('/')
        .get(mainController.index);

    // authentication

    app
        .route('/api/register')
        .post(userController.createUser);

    app
        .route('/api/login')
        .post(userController.findUser)
        .post(passport.authenticate('local',{
            successRedirect:'/',
            failureRedirect:'/api/login',
            failureFlash:true

        }))


};
    
