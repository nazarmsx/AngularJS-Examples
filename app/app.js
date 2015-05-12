var app = angular.module('myApp', ['ngRoute']);

app.controller('loginController', function ($scope) {
                $scope.password = '';
                $scope.email = '';
                $scope.onLogin=function(){console.log('Login!')};
            });
app.controller('registerController', function ($scope) {
                });
app.controller('homeController', function ($scope) {
             });


app.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : './views/home.html',
				controller  : 'homeController'
			})

			// route for the about page
			.when('/login', {
				templateUrl : './views/login.html',
				controller  : 'loginController'
			})

			// route for the contact page
			.when('/register', {
				templateUrl : './views/register.html',
				controller  : 'registerController'
			});
	});