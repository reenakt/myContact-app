'use strict';

var  _ =require('lodash');


var initGlobalConfig = function(){

    var config = {
        server: {},
        client: {}
    };

    var defaultConfig = require('./env/default'),
    
    environment = process.env.NODE_ENV;
var envConfig =_.extend(defaultConfig,require('./env/'+(environment||'devlopment')));

    config = _.extend(defaultConfig,envConfig); // multiple inheritance

    return config;


};
 module.exports= initGlobalConfig();
