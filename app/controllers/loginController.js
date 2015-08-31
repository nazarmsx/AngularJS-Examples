app.controller('loginController', function ($scope, $location)
{
//Model values    
    $scope.email = '';
    $scope.password = '';
    $scope.proceedLogin = function ()
    {
        console.log("User loged in,and I'am so happy!");
        $location.path('/after_login/');
    };
});

