export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      abstract: true,
      template: '<ui-view />',
      resolve: {
        resolvedUser: isAuthenticated
      }
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

function isAuthenticated($http, $state) {
  $http
    .get('app/components/login/user.json')
    .then(response => {
      return response.data;
    }, () => {
      $state.go('login');
    });
}
