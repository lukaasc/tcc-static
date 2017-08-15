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

export function checkUserAuthentication($http, $location, $log, $transitions, UserService) {
  $transitions.onStart({
    to: 'app.**'
  }, trans => {
    // const auth = trans.injector().get('AuthService');
    if (!UserService.isAuthenticated() && $location.path !== '/login') {
      // User isn't authenticated. Redirect to a login state
      return trans.router.stateService.target('login');
    }
  });
}
