var app = angular.module('myApp', ['ngMap']);
var data;

$.ajax({
    url: 'http://localhost:8081/hi',
    dataType: 'json',
    cache: false
}).done(function(data) {
    data = JSON.stringify(data);
    console.log(data);
});

app.controller('mapController', function($scope, $http, $interval) {
    $scope.dynMarkers = [];
    for (var i = 0; i < 8; i++) {
        $scope.dynMarkers[i] = new google.maps.Marker({
            title: "Marker: " + i
        })
    }

    $scope.GenerateMapMarkers = function() {
        var d = new Date(); //To show marker location changes over time
        $scope.date = d.toLocaleString();

        var numMarkers = Math.floor(Math.random() * 4) + 4; //between 4 to 8 markers
        for (i = 0; i < numMarkers; i++) {
            var lat = 43.6600000 + (Math.random() / 100);
            var lng = -79.4103000 + (Math.random() / 100);

            var loc = new google.maps.LatLng(lat, lng);
            $scope.dynMarkers[i].setPosition(loc);
            $scope.dynMarkers[i].setMap($scope.map);
        }
    };

    $interval($scope.GenerateMapMarkers, 2000);
});