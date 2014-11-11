// ionic-http-auth was made from the ionic-starter-app sideMenu
// to create a new app, at a command prompt type this: ionic start appname sideMenu

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'credentialManager' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'credentialManager.controllers' is found in controllers.js
// 'credentialManager.services is' found in services.js
angular.module('credentialManager', ['ionic', 'ngMockE2E', 'credentialManager.services', 'credentialManager.controllers'])

.run(function($rootScope, $ionicPlatform, $httpBackend, $http) {

	$ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  // Mocking code used for simulation purposes (using ngMockE2E module)	
  var authorized = false;
  var customers = [{name: 'John Smith'}, {name: 'Tim Johnson'},{name: 'Tuhin'},{name: 'Jisan'}];
  var credentials = [{siteName: 'Google', url:'www.test.com', userName: 'tuhin', pass: '12345'}, {siteName: 'Linkedin', url:'www.test.com', userName: 'tuhin', pass: '12345'},{siteName: 'Twitter', url:'www.test.com', userName: 'tuhin', pass: '12345'},{siteName: 'Facebook', url:'www.test.com', userName: 'tuhin', pass: '12345'}];
  
  // returns the current list of customers or a 401 depending on authorization flag
  $httpBackend.whenGET('https://customers').respond(function (method, url, data, headers) {
      console.log("wen GET Customers");
	  return authorized ? [200, customers] : [401];
  });

    // returns the current list of customers or a 401 depending on authorization flag
  $httpBackend.whenGET('https://credentials').respond(function (method, url, data, headers) {
      console.log("when GET Credentials");
	  return [200, credentials];
  });

  $httpBackend.whenPOST('https://login').respond(function(method, url, data) {
      console.log("wen Post login");
    authorized = true;
    return  [200 , { authorizationToken: "NjMwNjM4OTQtMjE0Mi00ZWYzLWEzMDQtYWYyMjkyMzNiOGIy" } ];
  });

  $httpBackend.whenPOST('https://logout').respond(function(method, url, data) {
      console.log("wen POST Logout");
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
