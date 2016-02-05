(function() {
	'use strict';


	angular
		.module('app', ['ngComponentRouter', 'dialog', 'heroes', 'crisis-center', 'random'])
		.config(function($locationProvider) {
	  		$locationProvider.html5Mode(true);
		})

		.run(function($router) {
		  $router.config([
		    { path: '/...', name: 'App', component: 'app', useAsDefault: true }
		  ]);
		  console.log($router);

		  $router.navigate(['App']);
		})

		.component('app', {

		  templateUrl: 'app/mainApp.html',
		    // '<nav class="navbar navbar-default">\n' +
			   //  '<ul class="nav navbar-nav"> ' +
			   //  ' <li> <a ng-link="[\'CrisisCenter\']">Crisis Center</a> </li>\n' +
			   //  '  <li> <a ng-link="[\'Heroes\']">Heroes</a> </li>\n' +
			   //  '  <li> <a ng-link="[\'Random\']">Random</a> </li>\n' +
			   //  '</ul>' +
		    // '</nav>\n' +
		    // '<ng-outlet></ng-outlet>\n',
		  $routeConfig: [
		    {path: '/crisis-center/...', name: 'CrisisCenter', component: 'crisisCenter', useAsDefault: true},
		    {path: '/heroes/...', name: 'Heroes', component: 'heroes'},
		    {path: '/disaster', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]},
		    {path: '/random', name: 'Random', component: 'randomInfo'}
		  ]
		});
})();