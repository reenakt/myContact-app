'use strict';

var express = require('express');//3rd party library

var bodyParser = require('body-parser');



// parse application/x-www-form-urlencoded

module.exports.initBodyParser = function(app) {
        app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
        app.use(bodyParser.json())
};

module.exports.init = function () {
        var app = express();
    
    this.initBodyParser(app);
    
        return app;
}