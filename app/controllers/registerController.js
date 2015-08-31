
app.controller('registerController', function ($scope, $http,$location) 
{
//Model values    
$scope.email='';
$scope.password='';
$scope.passwordConfirm='';

$scope.getUser=function()//returns the object,that represents 
{
return {email:$scope.email,password:$scope.password};
};

$scope.validatePasswords=function ()
{
return $scope.password===$scope.password;    
};
$scope.proceedRegistration=function()
{
$http.get("./app/api/request.php?action=register&user="+JSON.stringify($scope.getUser()))
            .success(function (response) {
            $location.path('/after_register/'+$scope.email); 
            });
};
});

app.directive('passwordValidate',function(){
return {
    restrict: 'A',
    require:'ngModel',
    link: function (scope,elem,attr,ctrl)
    {
   ctrl.$validators.passwordValidate=function(modelValue,viewValue){
       if(ctrl.$isEmpty(modelValue))
       return true;
   if(viewValue==scope.password)
       return true;
   return false;
    };
    }
    
};
}
);

app.directive('passwordValidateConfirm',function(){
return {
    restrict: 'A',
    require:'ngModel',
    link: function (scope,elem,attr,ctrl)
    {
   ctrl.$validators.passwordValidate=function(modelValue,viewValue){
       if(ctrl.$isEmpty(modelValue))
       return true;
   if(viewValue==scope.passwordConfirm)
       return true;
   return false;
    };
    }
    
};
}
);