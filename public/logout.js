angular.module('Dovideo', [])
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http){
    $scope.title = "Dopicture | Login";

    $scope.submit = function(){
      $scope.loginInfo = [{
        email: $scope.inputEmail,
        pass: $scope.inputPass,
        name: $scope.inputName
      }];
      $http.post('/login', $scope.loginInfo).then(function(data, status){
        alert('Logged In')
        window.location.href = "/index.html"
      })
      $scope.inputEmail = '';
      $scope.inputPass = '';
      $scope.inputName = '';
    }
  }])
