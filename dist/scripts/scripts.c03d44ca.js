"use strict";!function(){function a(){function a(a){d=a}function b(){return d}function c(a){function b(){"undefined"==typeof k&&(k="undefined"!==d?io.connect(d):io.connect())}function c(b){return function(){if(b){var c=arguments;a.$apply(function(){b.apply(k,c)})}}}function e(a,d,e){b(),2===arguments.length&&(d=null,e=arguments[1]),k.on(a,c(e)),null!==d&&d.$on("$destroy",function(){g(a,e)})}function f(a,d){b(),k.once(a,c(d))}function g(a,d){b(),k.removeListener(a,c(d))}function h(a){b(),k.removeAllListeners(a)}function i(a,d,e){b(),k.emit(a,d,c(e))}function j(){return k}var k,l={addListener:e,on:e,once:f,removeListener:g,removeAllListeners:h,emit:i,getSocket:j};return l}var d;this.setUrl=a,this.getUrl=b,this.$get=["$rootScope",c]}angular.module("ngSocket",[]).provider("$socket",a)}(),angular.module("telegramApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngTouch","ngSocket","yaru22.angular-timeago"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("telegramApp").controller("MainCtrl",["$scope","$socket","$http",function(a,b,c){a.busquedas=[],c.get("/telesocket").then(function(c){a.busquedas=c.data,console.log(c),b.on("messages",function(b){console.log(b),a.busquedas.push(b)})})}]),angular.module("telegramApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="list-group" ng-repeat="(key, peli) in busquedas"> <div class="list-group-item"> <div class="row-action-primary"> <i class="material-icons">folder</i> </div> <div class="row-content"> <div class="least-content"><time-ago from-time="{{peli.time}}"></time-ago></div> <h4 class="list-group-item-heading">{{peli.title}} <i>por {{peli.user}}</i></h4> <p class="list-group-item-text"><a href="{{peli.url}}">{{peli.url}}</a></p> </div> </div> <div class="list-group-separator"></div> </div>')}]);