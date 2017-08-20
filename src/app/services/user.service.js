import {
  BaseService
} from './base.service';

export class UserService extends BaseService {
  /** ngInject */
  constructor($http, $q) {
    super($http);
    this._$q = $q;
    this.username = '';
    this.email = '';
    this.token = '';
  }

  doLogin(user) {
    const deferred = this._$q.defer();

    this.doPost('/api/login/authenticate', user).then(response => {
      this.username = response.data.username;
      this.token = response.data.token;
      this.email = response.data.email;

      deferred.resolve(response);
    }, error => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  doLogout() {

  }

  isAuthenticated() {
    return this.username && this.token && this.email;
  }
}
