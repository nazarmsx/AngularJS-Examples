app.controller('loginController', function ($scope, $http,$location) 
{
//Model values    
$scope.email='';
$scope.password='';
$scope.proceedLogin=function()
{
    console.log("User loged in,and I'am so happy!");
};
});

