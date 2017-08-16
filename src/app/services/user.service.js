import {
  BaseService
} from './base.service';

export class UserService extends BaseService {
  /** ngInject */
  constructor($http, $state) {
    super($http);
    this._$state = $state;
    this.userId = '';
    this.token = '';
  }

  doLogin(userId, password) {
    this.doPost('/api/user/login', {
      userId,
      password
    }).then(response => {
      this.userId = response.data.userId;
      this.token = response.data.token;
      this._$state.go('app.home');
    });
  }

  doLogout(userId, token) {
    this.doPost('/api/user/logout', {
      userId,
      token
    }).then(() => {
      this.userId = '';
      this.token = '';
      this._$state.go('login');
    });
  }

  isAuthenticated() {
    return this.userId && this.token;
  }
}
