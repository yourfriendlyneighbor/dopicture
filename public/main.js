angular.module('Dovideo', [])
  .controller('MainCtrl', ['$scope', '$http', function($scope, $http){
    $http.get('/getVideos').then(function(data, status){
      for (var i = 0; i < data.data.length; i++) {
        $scope.Latestvideos.push(data.data[i])
      }
    })
    $http.get('/getuserdata').then(function(data, status){
      for (var i = 0; i < data.data.length; i++) {
        $scope.username = data.data[i].name || 'Username not found';
        //$scope.totalvideos = data.data[i].totalvideos;
      }
    })
    setTimeout(function(){
      const dataToSend = [{username: $scope.username}]
      $http.post('/subz', dataToSend).then(function(data, status){
        console.log(data);
        $scope.subs = data.data.subs | 'Subscribers not found'
        clearInterval()
      })
    },300);


    /* Variables to Set */
      $scope.Latestvideos = [];
      $scope.title = "User | Dashboard";
    /* */

    /* Things to Eventually put in mongodb */
      $scope.totalvideos = 18;
    /* */
    $scope.addSub = function(author){
      console.log(author);
      $
      $scope.infoToSend = [{
        author: author
      }]
      $http.post('/subs', $scope.infoToSend).then(function (data, status) {
        console.log(data.data);
      })
    }


    $scope.submit = function(){
      $scope.video =
        [{
          title: $scope.Vidtitle,
          src: 'uploads/img/puppy2.jpg',
          author: $scope.username,
          date: new Date,
          description: $scope.Viddescription,
          subs: $scope.subs
        }]
      $http.post('/video', $scope.video).then(function(data, status) {
        alert($scope.Vidtitle + ' has been created.')
        for (var i = 0; i < data.config.data.length; i++) {
          $scope.Latestvideos.push(data.config.data[i])
        }
      })
    }
  }])
