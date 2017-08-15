export class UserService {
  /** ngInject */
  constructor($http) {
    this._$http = $http;
    this.userId = '';
    this.token = '';
  }

  doLogin() {

  }

  doLogout() {

  }

  isAuthenticated() {
    return false;
  }
}
