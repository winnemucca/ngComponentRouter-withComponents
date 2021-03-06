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

		  // This tells the component Router to navigate to the top level Route with teh name App. ***** this matches the name in $router.config;
		  $router.navigate(['App']);
		})

		.component('app', {

		  templateUrl: 'app/mainApp.html',
		    
		  $routeConfig: [
		    {path: '/crisis-center/...', name: 'CrisisCenter', component: 'crisisCenter', useAsDefault: true},
		   
		    {path: '/heroes/...', name: 'Heroes', component: 'heroes'},
		    {path: '/disaster', name: 'Asteroid', redirectTo: ['CrisisCenter', 'CrisisDetail', {id:3}]},
		    {path: '/random', name: 'Random', component: 'randomInfo'}
		  ]
		});
})();