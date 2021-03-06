(function(){
  'use strict';

  angular.module('intouch')
  .factory('Contact', ['$http', '$upload', function($http, $upload){

    function findContacts(){
      return $http.get('/contacts');
    }

    function addContactWithFiles(contact, files){
      var file = files ? files[0] : null;
      return $upload.upload({
        url: '/contacts',
        method: 'POST',
        //headers: {'header-key': 'header-value'},
        withCredentials: true,
        data: {contact: contact},
        file: file,
        fileName: 'photo.jpg' // or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name.
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      });
      // access or attach event listeners to the underlying XMLHttpRequest
      // .xhr(funtion(xhr){xhr.upload.addeventListener(...)})
    }

    return {findContacts:findContacts, addContactWithFiles:addContactWithFiles};
  }]);
})();

