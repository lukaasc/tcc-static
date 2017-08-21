import {
  BaseService
} from './base.service';

export class UserService extends BaseService {
  /** @ngInject */
  constructor($cookies, $http, $q) {
    super($http);
    this._$q = $q;
    this._$cookies = $cookies;

    this.currentUser = {
      username: '',
      email: '',
      token: ''
    };
  }

  doLogin(user) {
    const deferred = this._$q.defer();

    this.doPost('/api/login/authenticate', user).then(response => {
      this.currentUser.username = response.data.username;
      this.currentUser.token = response.data.token;
      this.currentUser.email = response.data.email;

      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 1);

      this._$cookies.putObject('currentUser', this.currentUser, {
        expires: expireDate
      });

      deferred.resolve(response);
    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  doLogout() {

  }

  isAuthenticated() {
    return this.currentUser && this.currentUser.username && this.currentUser.token && this.currentUser.email;
  }
}
