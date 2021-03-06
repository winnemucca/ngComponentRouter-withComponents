"use strict";

angular.module('crisis-center', [])
  .service('crisisService', CrisisService)

  .component('crisisCenter', {
    templateUrl: '/app/crisisCenter.html',
    $routeConfig: [
      {path:'/',    name: 'CrisisList',   component: 'crisisList', useAsDefault: true},
      {path:'/:id', name: 'CrisisDetail', component: 'crisisDetail'},
      {path:'/crisisPractice', name: 'CrisisPractice', component: 'crisisPractice'}
    ]
  })

  .component('crisisList', {
    templateUrl:'/app/crisisList.html',
      // '<ul>\n' +
      // '  <li ng-repeat="crisis in $ctrl.crises"\n' +
      // '    ng-class="{ selected: $ctrl.isSelected(crisis) }"\n' +
      // '    ng-click="$ctrl.onSelect(crisis)">\n' +
      // // '    >' +
      // // '  <a ng-link="[\'CrisisDetail\', { id: crisis.id }]">\n' +
      // '    <span class="badge">{{crisis.id}}</span> {{crisis.name}}\n' +
      // // '  </a>' +
      // '  </li>\n' +
      // '</ul>\n',
    controller: CrisisListComponent,
    $canActivate: function($nextInstruction, $prevInstruction) {
      console.log('$canActivate', arguments);
    }
  })

  .component('crisisPractice', {
    templateUrl: 'crisisPractice.html',
    controller: CrisisPracticeComponent
  })

  .component('crisisDetail', {
    templateUrl:'/app/crisisDetail.html',
      // '<div ng-if="$ctrl.crisis">\n' +
      // '  <h3>"{{$ctrl.editName}}"</h3>\n' +
      // '  <div>\n' +
      // '    <label>Id: </label>{{$ctrl.crisis.id}}</div>\n' +
      // '  <div>\n' +
      // '    <label>Name: </label>\n' +
      // '    <input ng-model="$ctrl.editName" placeholder="name"/>\n' +
      // '  </div>\n' +
      // '  <button ng-click="$ctrl.save()">Save</button>\n' +
      // '  <button ng-click="$ctrl.cancel()">Cancel</button>\n' +
      // '</div>\n',
    controller: CrisisDetailComponent
  });


function CrisisService($q) {
  var crisesPromise = $q.when([
    {id: 1, name: 'Princess Held Captive'},
    {id: 2, name: 'Dragon Burning Cities'},
    {id: 3, name: 'Giant Asteroid Heading For Earth'},
    {id: 4, name: 'Release Deadline Looms'}
  ]);

  this.getCrises = function() {
    return crisesPromise;
  };

  this.getCrisis = function(id) {
    return crisesPromise.then(function(crises) {
      for(var i=0; i<crises.length; i++) {
        if ( crises[i].id == id) return crises[i];
      }
    });
  };
}


function CrisisPracticeComponent() {
  console.log('in');
}


function CrisisListComponent(crisisService) {
  var _selectedId = null;
  var _router;
  var ctrl = this;

  this.$routerOnActivate = function(router, next) {
    console.log('$routerOnActivate', this, arguments);
    // Get hold of the nearest router
    _router = router;
    // Load up the crises for this view
    crisisService.getCrises().then(function(crises) {
      ctrl.crises = crises;
      _selectedId = next.params.id;
    });
  };

  this.isSelected = function(crisis) {
    return (crisis.id == _selectedId);
  };

  this.onSelect = function(crisis) {
    _router.navigate(['CrisisDetail', { id: crisis.id }]);
  };
};

function CrisisDetailComponent(crisisService, dialogService) {
  var ctrl = this;
  var _router;

  this.$routerOnActivate = function(router, next) {
    // Get hold of the nearest router
    _router = router
    // Get the crisis identified by the route parameter
    var id = next.params.id;
    crisisService.getCrisis(id).then(function(crisis) {
      if (crisis) {
        ctrl.editName = crisis.name;
        ctrl.crisis = crisis;
      } else { // id not found
        ctrl.gotoCrises();
      }
    });
  };

  this.$routerCanDeactivate = function() {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged.
    if (!this.crisis || this.crisis.name === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return dialogService.confirm('Discard changes?');
  };

  this.cancel = function() {
    ctrl.editName = ctrl.crisis.name;
    ctrl.gotoCrises();
  };

  this.save = function() {
    ctrl.crisis.name = ctrl.editName;
    ctrl.gotoCrises();
  };

  this.gotoCrises = function() {
    var crisisId = ctrl.crisis && ctrl.crisis.id;
    // Pass along the hero id if available
    // so that the CrisisListComponent can select that hero.
    _router.navigate(['CrisisList', {id: crisisId}]);
  };
}














