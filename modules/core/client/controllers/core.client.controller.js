'use strict';
angular
    .module('ContactsApp')
    .controller('ContactsCtrl',['$scope','ContactService','$state',function ($scope,ContactService,$state) {


        var contactsPromise = ContactService.getContacts();
        var successCallback = function (response) {

            $scope.contacts = response;

            $scope.fields = Object.keys($scope.contacts[0]) || [];

        }

        var failureCallback = function (err) {
            console.log("Error while fetching contacts");
        }
        contactsPromise

            .success(successCallback)
            .error(failureCallback);

        //update contact after clicking action

        $scope.updateContact = function (contact) {

            $state.go('edit', {contactId: contact._id});
        }


        $scope.delete = function (id) {

            var deletePromise = ContactService.deleteContact(id);

            var successCallback = function (response) {
                $scope.message = response;

            };

            var failureCallback = function (err) {
                console.log("Error while delete contacts");
            };

            deletePromise

                .success(successCallback)
                .error(failureCallback);
        }

    }])

     .controller('editCtrl',['$scope','contactId','ContactService', function ($scope , contactId, ContactService) {

                ContactService

                    .getContact(contactId)
                    .success(function(contact){
                        $scope.contact=contact;
                    }).error(function(err){
                        console.log("Error::occured during get operation")
                })
            }])


  .controller('updateCtrl',['$scope','ContactService','$state',function ($scope,ContactService,$state) {


        $scope.update = function(contact) {
            var updatePromise = ContactService.updateContact(contact._id,contact);
            var successCallback = function (response) {
                console.log("success");
                $state.go('display');
            };

            var failureCallback = function (err) {
                console.log("Error while update contacts");
                $state.go('edit');
            }

            updatePromise

                .success(successCallback)
                .error(failureCallback);

        }
    }])





    .controller('saveCtrl',['$scope','ContactService',function($scope,ContactService){

        var contact=$scope.contact;

        $scope.saveContact=function(contact){
            var savePromise = ContactService.createContact(contact);
            var successCallback = function (response) {
                console.log("success");
            }

            var failureCallback = function (err) {
            console.log("Error while saving contacts");
        }

        savePromise

            .success(successCallback)
            .error(failureCallback);
        }

    }])


    .controller('UserCtrl',['$scope','ContactService',function($scope,ContactService){

        var user = $scope.user;

        $scope.signUp = function(user){

            var savePromise = ContactService.createUser(user);
            var successCallback = function (response) {
                console.log("success");
            }

            var failureCallback = function (err) {
                console.log("Error while registering new user");
            }

            savePromise

                .success(successCallback)
                .error(failureCallback);
        }

    }])


    .controller('logInCtrl',['$scope','$rootScope','$state','ContactService',function($scope,$rootScope,$state,ContactService){


        $scope.signIn=function(user){
            var userPromise = ContactService.findUser(user);
            var successCallback = function (response) {
                $rootScope.hideSign = true;
                $scope.hideLogIn = true;
                $rootScope.welcome = response;
                $rootScope.showUser = true;
                $state.go('display');

                console.log("success");
            };

            var failureCallback = function (err) {
                console.log("Error while login");
            }

            userPromise

                .success(successCallback)
                .error(failureCallback);
        }

    }])



