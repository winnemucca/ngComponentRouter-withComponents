angular
	.module('random', [])
	.component('randomInfo', {
		templateUrl: 'app/random.html',
		controller: RandomComponent
	})


	function RandomComponent() {
		console.log('random');
	}