'use strict';

angular
    .module('ContactsApp')
    .config(function($stateProvider){

        $stateProvider
            .state('display' ,{

                url:'/display',
                templateUrl:'modules/core/client/views/display.client.tpl.html'
            })

      .state('create',{
       url:'/create',
        templateUrl:'modules/core/client/views/create.client.tpl.html'

})

            .state('edit',{
                url:'/edit/:contactId',
                templateUrl:'modules/core/client/views/edit.client.tpl.html',
                resolve: {
                    contactId: function ($stateParams) {
                        return $stateParams.contactId;
                    }
                },
                controller:'editCtrl'
            })

    .state('signUp',{

     url:'/signUp',

      templateUrl:'modules/core/client/views/register.client.tpl.html'

})

            .state('login',{

                url:'/login',

                templateUrl:'modules/core/client/views/login.client.tpl.html'

            })

    });
