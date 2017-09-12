class HeaderController {
  /** @ngInject */
  constructor($state, UserService, $rootScope) {
    this._rootScope = $rootScope;
    this._state = $state;
    this._rootScope.UserService = UserService;

    this.visible = UserService.currentUser && UserService.currentUser.username;
  }

  $onInit() {
    this._rootScope.$watch('UserService.currentUser', newVal => {
      this.visible = Boolean(newVal.username);
    }, true);
  }

  logout() {
    this._rootScope.UserService.doLogout();
    this._state.go('login');
  }
}

export const header = {
  template: require('./header.html'),
  controller: HeaderController
};
