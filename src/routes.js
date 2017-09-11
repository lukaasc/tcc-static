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

export function checkUserAuthentication($cookies, $transitions, UserService, SocketService) {
  /**
   * Initiates socket.io for real time updates
   */
  SocketService.init();

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
