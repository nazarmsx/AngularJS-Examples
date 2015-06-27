var app = angular.module('myApp', ['ngRoute']);

app.controller('userCtrl', function($scope,$http) {

$scope.getCustomerForm=function()
{
var customer={
    id:$scope.customer.id,
    name: $scope.customer.name,
    email:$scope.customer.email,
    telephone:$scope.customer.telephone,
    street:$scope.customer.street,
    city:$scope.customer.city,
    state:$scope.customer.state,
    zip:$scope.customer.zip
            };
return customer;
};
$scope.master = {name : "",email : "",telephone : "",street : "",city : "",state : "",zip : ""};
    $scope.reset = function() {
        $scope.customer = angular.copy($scope.master);
    };
$scope.reset();
    
$http.get("./app/api/request.php")
  .success(function (response) { $scope.users = response.records;
                                 $scope.filteredUsers=response.records.slice(0,10); 
   });

$scope.currentPage=0;
$scope.next=function()
{
$scope.currentPage++;
$scope.filteredUsers=$scope.users.slice($scope.currentPage*10,($scope.currentPage*10)+10)
};
$scope.previous=function()
{
    if($scope.currentPage--<0)
    $scope.currentPage=0;
$scope.filteredUsers=$scope.users.slice($scope.currentPage*10,($scope.currentPage*10)+10)
};
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
$scope.editUser = function(id) {
  if (id == 'new') {
    $scope.users.push($scope.getCustomerForm()
    );
    } else {
    for(var i=0;i<$scope.users.length;i++)
    {
    if($scope.users[i].id==id)
    {
    $scope.edit = false;
    var user=$scope.users[i];
    $scope.customer = angular.copy(user);
    break;
    }
    }
  }
};
$scope.saveCustomerInfo=function()
{
for(var i=0;i<$scope.users.length;i++)
    {
    if($scope.users[i].id==$scope.customer.id)
    {
    $scope.users[i]=$scope.getCustomerForm(); //update table
    $scope.cancelSavingPersonalInfo();//clear form
    $http.get('./app/api/request.php?update=true&user='+JSON.stringify($scope.users[i])).success(function (){console.log('./app/api/request.php?update=true&user='+JSON.stringify($scope.users[i]));});//exucute request to server 
    break;
    }  
    }
};

$scope.deleteCustomer=function(id)
{
 $scope.users = $scope.users
               .filter(function (el) {
                        return el.id !== id;
                       });
};

$scope.cancelSavingPersonalInfo=function()
{
    $scope.reset();
    $scope.edit = true;
};


})

app.config(function($routeProvider) {
		$routeProvider
			// route for the home page
			.when('/', {
				templateUrl : './views/home.html',
				controller  : 'userCtrl'
			}).when('/login', {
				templateUrl : './views/login.html',
				controller  : 'loginController'
			})

			// route for the contact page
			.when('/register', {
				templateUrl : './views/register.html',
				controller  : 'registerController'
			});			
	});