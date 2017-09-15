export class LocationService {
  /** @ngInject */
  constructor($log, $window, $q) {
    this._$log = $log;
    this._$window = $window;
    this._$q = $q;

    this.deferred = this._$q.defer();
  }

  getLocation() {
    if (!this._$window.navigator.geolocation) {
      return this.deferred.reject('Geolocation não suportada.');
    }

    this._$window.navigator.geolocation.getCurrentPosition(
      position => {
        this.deferred.resolve(position);
      },
      err => {
        this.deferred.reject(err);
      });
  }

  calculateDistanceMatrix(hospitalLocation) {
    this.deferred.promise.then(location => {
      this._$log.debug(`User GeoLocation ${location} ${hospitalLocation}`);

      // make call to google api
    }, err => {
      this._$log.debug(`Unable to obtain user's location \n${err}`);
    });
  }
}
