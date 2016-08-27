'use strict';

var mongoose = require('mongoose'),

    User = mongoose.model('ReenaUsers');


module.exports.saveUser = function(savableUser,callback){

    var user = new User(savableUser);

    user.save(function (err) {
        if(err){
            callback(err);
        }
        callback(null,user);
    });

}

module.exports.findUser = function (username,pass,callback) {

    User.findOne({username:username, password:pass},function (err,user) {

        if(err){
            callback(err);
        }

        if(!user){
            callback(false,null);
        }else{
            callback(null,user);
        }
    })

}
