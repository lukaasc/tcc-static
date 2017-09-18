// const API_KEY = 'AIzaSyDz3fD4w5ymSTanTDm0Sp_o2nC1EJ18JJY';
const REGION = 'pt-BR';

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

  calculateDistanceMatrix(hospitalLocation, travelMode, callback) {
    this.deferred.promise.then(position => {
      this._$log.debug(`User GeoLocation ${position} ${hospitalLocation}`);

      /* eslint-disable */
      const service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
        origins: [`${position.coords.latitude},${position.coords.longitude}`],
        destinations: [`${hospitalLocation.latitude},${hospitalLocation.longitude}`],
        travelMode,
        region: REGION
      }, callback);
      /* eslint-enable */
    }, err => {
      this._$log.debug(`Unable to obtain user's location \n${err}`);
    });
  }
}
