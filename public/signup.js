angular.module('Dovideo', [])
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http){
    $scope.title = "Dopicture | Signup";

    $scope.submit = function(){
      $scope.signupInfo = [{
        email: $scope.inputEmail,
        pass: $scope.inputPass,
        name: $scope.inputName
      }];
      console.log('Submited');
      $http.post('/signup', $scope.signupInfo).then(function(data, status){
        alert('You have successfuly created an account!')
        window.location.href = "/logout.html"
      })
      $scope.inputEmail = '';
      $scope.inputPass = '';
      $scope.inputName = '';
    }
  }])
