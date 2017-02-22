angular.module('Dovideo', [])
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('/getVideos').then(function(data, status){
      for (var i = 0; i < data.data.length; i++) {
        $scope.Latestvideos.push(data.data[i])
      }
    })
    $http.get('/getuserdata').then(function(data,status){
      for (var i = 0; i < data.data.length; i++) {
        $scope.username = data.data[i].name;
        //$scope.subs = data.data[i].subs;
        //$scope.totalvideos = data.data[i].totalvideos;
      }
    })
    /* Variables to Set */
      $scope.Latestvideos = [];
      $scope.title = "User | Dashboard";
    /* */

    /* Things to Eventually put in mongodb */
      $scope.subs = 13
      $scope.totalvideos = 18;
    /* */

    $scope.submit = function(){
      $scope.video =
        [{
          title: $scope.Vidtitle,
          src: 'uploads/img/puppy2.jpg',
          author: $scope.username,
          date: new Date,
          description: $scope.Viddescription
        }]
      $http.post('/video', $scope.video).then(function(data, status) {
        alert($scope.Vidtitle + ' has been created.')
        for (var i = 0; i < data.config.data.length; i++) {
          $scope.Latestvideos.push(data.config.data[i])
        }
      })
    }
  }])
