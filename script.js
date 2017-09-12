(function(){
var app=angular.module("abc",[]);
var cntrl=function($scope,$http,$interval,$log){
    var userData= function(response){
        $scope.user=response.data;
        $http.get($scope.user.repos_url).then(onRepos,onerror);
    };
    var onRepos=function(response){
      $scope.repos=response.data;  
    };
    var onerror=function(reason){
        $scope.error="Cant Find URL";
    };
    var deCounter =function(){
      $scope.countdown-=1;
        if($scope.countdown<1){
            $scope.search($scope.username);
        }    
    };
    var countInterval=null;
    var startCountDown=function(){
      countInterval = $interval(deCounter,1000,$scope.countdown);   
    };
    $scope.search=function(username){
    $http.get("https://api.github.com/users/"+username).then(userData,onerror);
        if(countInterval){
            $interval.cancel(countInterval);
            $scope.countdown=null;
        }
    };
    $scope.username="angular";
    $scope.sortOrder="-stargazers_count";
    $scope.countdown=5;
    startCountDown();
    
    
};
    app.controller("cntrl",["$scope","$http","$interval","$log",cntrl]);
}());