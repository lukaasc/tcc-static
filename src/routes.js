/** @ngInject */
export function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      template: '<ui-view />'
    })
    .state('app.home', {
      url: '/',
      component: 'app'
    })
    .state('login', {
      url: '/login',
      component: 'login'
    });
}

export function checkUserAuthentication($state, $location, $transitions, UserService) {
  $transitions.onStart({
    to: 'app.**'
  }, trans => {
    if (!UserService.isAuthenticated()) {
      // User isn't authenticated. Redirect to a login state
      return trans.router.stateService.target('login');
    }
  });
}
