export class BaseService {
  /** @ngInject */
  constructor($http) {
    this._$http = $http;
  }

  doGet(url, params) {
    return this._$http
      .get(url, params);
  }

  doPost(url, params) {
    return this._$http
      .post(url, params);
  }

  doPut(url, params) {
    return this._$http
      .put(url, params);
  }
}
