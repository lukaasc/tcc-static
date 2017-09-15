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

export function init($cookies, $transitions, UserService, SocketService, LocationService) {
  /**
   * Initiates socket.io for real time updates
   */
  SocketService.init();

  /**
   * Tries to get user's current GeoLocation
   */
  LocationService.getLocation();

  /**
   * Listen for route state changes to check if user is authenticated
   */
  $transitions.onStart({
    to: 'app.**'
  }, trans => {
    const currentUser = $cookies.getObject('currentUser');

    if (!UserService.isAuthenticated() && !currentUser) {
      // User isn't authenticated. Redirect to login state
      return trans.router.stateService.target('login');
    }

    if (!UserService.currentUser.token) {
      UserService.currentUser.username = currentUser.username;
      UserService.currentUser.email = currentUser.email;
      UserService.currentUser.token = currentUser.token;
      UserService.currentUser.currentQueue = currentUser.currentQueue;
    }
  });
}
