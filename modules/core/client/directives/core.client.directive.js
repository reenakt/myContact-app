
'use strict';

angular
    .module(ApplicationConfiguration.applicationModuleName)

.directive('testDirective',function () {

    return {
        template: "<h1>Made by a directive!</h1>"
    }
})





/*
angular
   .module(ApplicationConfiguration.applicationModuleName)

       .value('ContactForm',{
           fields:['firstName','lastName','email','zip','city','phone','address']
       })

       .directive('contactForm',function(ContactForm) {
           return {
               restrict: 'E',
               templateUrl: 'modules/core/views/contact-form.client.tpl.html',
               scope: false,
               link: function ($scope, element, attr) {
                   $scope.fields = ContactForm.fields || ContactForm.fields;
               }
           }
       })
    */