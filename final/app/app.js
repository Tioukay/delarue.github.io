var internshipApp = angular.module('internshipApp', ['ngRoute']);

internshipApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'databaseCtrl'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/add', {
            templateUrl: 'views/add.html',
            controller: 'databaseCtrl'
        })
        .otherwise({ redirectTo: 'views/404.html'})
}]);


internshipApp.controller('databaseCtrl', ['$scope', '$http', function($scope, $http){

    $scope.addRaw = function() {
        var direction;
        if ($scope.newRaw.enter) {
            direction = 1;
        }
        else if ($scope.newRaw.leave) {
            direction = 0;
            }


        $scope.psh_raw.push({
            rid: $scope.psh_raw.length+1,
            fk_user: parseInt($scope.newRaw.fk_user),
            time: $scope.newRaw.time,
            direct: direction,
            type: parseInt($scope.newRaw.type)
        });

        $scope.newRaw.fk_user = "";
        $scope.newRaw.time = "";
        $scope.newRaw.enter = false;
        $scope.newRaw.leave = false;
        $scope.newRaw.type = "";
    };

    $http({
        url : 'http://localhost:8080/db_get',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(httpResponse){
        $scope.psh_raw = httpResponse.data;
    });

    $scope.enter = function(){
        $http({
            url : 'http://localhost:8080/db_enter',
            method: 'POST',
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            data: {monthNumber: $scope.month, fk_user: $scope.userID},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(httpResponse){
            console.log("Server answer:", httpResponse);
            $scope.psh_raw = httpResponse.data;
        });
    };

    $scope.leave = function(){
        $http({
            url : 'http://localhost:8080/db_leave',
            method: 'POST',
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            data: {monthNumber: $scope.month, fk_user: $scope.userID},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(httpResponse){
            console.log("Server answer:", httpResponse);
            $scope.psh_raw = httpResponse.data;
        });
    };

    $scope.resume = function(){
        $http({
            url : 'http://localhost:8080/db_resume',
            method: 'POST',
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                },
            data: {monthNumber: $scope.month},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function(httpResponse){
            console.log("Server answer:", httpResponse);

        });
    };

}]);
