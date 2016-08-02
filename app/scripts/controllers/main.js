'use strict';

/**
 * @ngdoc function
 * @name telegramApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the telegramApp
 */
angular.module('telegramApp')
  .controller('MainCtrl',['$scope','$socket','$http', function ($scope,$socket,$http) {
  	$scope.busquedas = [];
  	$http.get('/telesocket').then(function(res){
  		$scope.busquedas = res.data;
  		console.log(res)
  		$socket.on('messages', function(data) {
    		console.log(data)
            $scope.busquedas.push(data);
        });
  	})
    
  }]);
