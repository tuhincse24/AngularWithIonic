var db = null;
// // ionic-http-auth was made from the ionic-starter-app sideMenu
// to create a new app, at a command prompt type this: ionic start appname sideMenu

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'credentialManager' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'credentialManager.controllers' is found in controllers.js
// 'credentialManager.services is' found in services.js
angular.module('credentialManager', ['ionic', 'ngMockE2E', 'credentialManager.services', 'credentialManager.controllers', 'ngCordova'])

.run(function($rootScope, $ionicPlatform, $httpBackend, $http, $cordovaSQLite) {

    $ionicPlatform.ready(function() {
        if(window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

          if(window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         }
//         if($cordvovaSQLite)
//            db = $cordovaSQLite.openDB({ name: "my.db" });
//        else
            db = window.openDatabase("my.db", "1.0", "Test DB", 1000000);
        $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS credential (id integer primary key, siteName text, url text, userName text, email text, password text)");
    
  });
  
  // Mocking code used for simulation purposes (using ngMockE2E module)	
  var authorized = false;
  var customers = [{name: 'John Smith'}, {name: 'Tim Johnson'},{name: 'Tuhin'},{name: 'Jisan'}];

  
  // returns the current list of customers or a 401 depending on authorization flag
  $httpBackend.whenGET('https://customers').respond(function (method, url, data, headers) {
      console.log("when GET Customers");
	  return authorized ? [200, customers] : [401];
  });

    // returns the current list of customers or a 401 depending on authorization flag
  $httpBackend.whenGET('https://credentials').respond(function (method, url, data, headers) {
      console.log("when GET Credentials");
      var credentials = [];
	  return [200, credentials];
  });

    // returns the current list of customers or a 401 depending on authorization flag
  $httpBackend.whenGET('https://credential').respond(function (method, url, data, headers) {
      console.log("when GET Credential");
	  return [200];
  });

  $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
      console.log("when Post login");
    authorized = true;
    return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
  });

  $httpBackend.whenPOST('https://logout').respond(function(method, url, data) {
      console.log("when POST Logout");
    authorized = false;
    return [200];
  });

  // All other http requests will pass through
  $httpBackend.whenGET(/.*/).passThrough();
  
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  
    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: "/home",
	  views: {
	      'menuContent' :{
	          controller:  "HomeCtrl",
	          templateUrl: "templates/home.html"            	
	      }
	  }      	  
    })
    .state('app.customers', {
      url: "/customers",
	  views: {
	      'menuContent' :{
	          controller:  "CustomerCtrl",
	          templateUrl: "templates/customers.html"            	
	      }
	  }      	  
    })
    .state('app.credentials', {
      url: "/credentials",
	  views: {
	      'menuContent' :{
	          controller:  "CredentialCtrl",
	          templateUrl: "templates/credentials.html"            	
	      }
	  }      	  
    })
    .state('app.credential', {
      url: "/credential",
	  views: {
	      'menuContent' :{
	          controller:  "CredentialCtrl",
	          templateUrl: "templates/credential.html"            	
	      }
	  }      	  
    })
    .state('app.logout', {
      url: "/logout",
      views: {
    	   'menuContent' :{
    		   controller: "LogoutCtrl"
    	    }
      } 
    });
  $urlRouterProvider.otherwise("/app/home");
});
