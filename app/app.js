var app = angular.module('myApp', ['ngRoute']);


app.controller('userCtrl', function($scope,$http) {
$scope.name = '';
$scope.email = '';
$scope.telephone = '';
$scope.street = '';
$scope.city = '';
$scope.state = '';
$scope.zip = '';


$http.get("./app/customers.json")
  .success(function (response) {$scope.users = response.records;});
  
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
$scope.editUser = function(id) {
  if (id == 'new') {
    $scope.edit = true;
    $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    } else {
    //$scope.edit = false;
    for(var i=0;i<$scope.users.length;i++)
    {
    if($scope.users[i].email=id)
    {
    var user=$scope.users[i];
    $scope.name = user.name;
    $scope.email = user.email;
    $scope.telephone = user.telephone;
    $scope.street = user.street;
    $scope.city = user.city;
    $scope.state = user.state;
    $scope.zip = user.zip;
    }
    break;
    }
    
  }
};
$scope.saveCustomerInfo=function()
{
alert($scope.name);   
};


})

app.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : './views/home.html',
				controller  : 'userCtrl'
			});
			
	});