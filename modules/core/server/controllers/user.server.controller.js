'use strict';


  var userService = require('../services/user.server.services');

  module.exports.createUser = function (req,res) {

    var user = req.body;

user.provider = 'local';
    userService.saveUser(user,function (err,user) {

        if(err){
            console.log(err);
            res
                .status(400)
                .send({mesaage:"Internal error while saving data"})

        }

        else {
            res
                .status(200)
                .send("User has been registered successfully");
        }
    })
}

module.exports.findUser = function(req,res){

    var username = req.body.userName,
        name= req.body.name,
        pass = req.body.password

    userService.findUser(username,pass,function(err,foundUser){

        console.log(foundUser);

        if(err || !foundUser){
            res
                .status(400)
                .send({Error:"Unable to log in. Please try again."})
        }else {

            res.status(200)
            .send("Welcome " + foundUser.name);

        }
    });
}
