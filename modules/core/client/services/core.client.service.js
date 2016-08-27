'use strict';

angular
    .module('ContactsApp')
    .factory('ContactService',function($http) {


        var _getContacts = function () {

            var promise = $http.get('/api/contact');

            return promise;

        }


        var _getContact = function (id) {

            return $http.get('/api/contact/' + id);
        }

         var _updateContact = function (id,contact) {
            var promise = $http.put('/api/contact/' +id,contact)
            return promise;

        }

         var _createContact = function (contact) {
        var promise = $http.post('/api/contact', contact)
        return promise;

    }

     var _deleteContact = function (id) {
        var promise = $http.delete('/api/contact/' +id)
        return promise;

    }

// login and sign up


    var _createUser = function (user) {

        var promise = $http.post('/api/register',user)

        return promise;

    }

    var _findUser = function (user) {

        var promise = $http.post('/api/login',user)

        return promise;
    }


        return {
            getContacts: _getContacts,
            getContact:   _getContact,
            updateContact: _updateContact,
            createContact: _createContact,
            deleteContact: _deleteContact,
            createUser: _createUser,
            findUser: _findUser

        };
    })




















