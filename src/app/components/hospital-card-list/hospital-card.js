import swal from 'sweetalert2';
import toastr from 'toastr/build/toastr.min.js';
import './hospital-card.scss';
import moment from 'moment/min/moment.min';

class HospitalCardController {

  /** @ngInject */
  constructor($interval, $log, $scope, $timeout, QueueService, UserService, LocationService, SocketService) {
    this._$interval = $interval;
    this._$log = $log;
    this._$timeout = $timeout;

    this.QueueService = QueueService;
    this.UserService = UserService;
    this.LocationService = LocationService;
    this.SocketService = SocketService;

    this.username = UserService.currentUser.username;
    this.arrivalTimeInterval = null;
    this.arrivalTimeDuration = null;
    this.mediumTime = null;
    this.distance = {};

    this._$scope = $scope;
  }

  $onInit() {
    if (this.card.currentQueue[0]) {
      this.startArrivalTimeCalc();
    }

    this.QueueService.getMediumTime(this.card.hospitalCode).then(response => {
      this.mediumTime = response.data;
    }, () => {
      this._$log.debug(`Failed trying to retrive medium time for queue [${this.card.hospitalCode}]`);
    });

    this.SocketService.watch(this.card.hospitalCode, data => {
      this.mediumTime = data.mediumTime ? data.mediumTime : this.mediumTime;
      this.card.queue = data.queue.length;

      if (!data.action && this.card.currentQueue && this.card.currentQueue[0]) {
        this.card.currentPosition = data.queue.findIndex(element => element.username === this.username);

        toastr.info('Sua fila atual sofreu alterações', this.card.name);
      }

      if ((this.card.currentPosition + 1) <= 0) {
        this.card.currentQueue = [];
        this._$interval.cancel(this.arrivalTimeInterval);
      }

      this._$scope.$apply();
    });

    /**
     * Tries to calculate distance matrix from user's location to hospital location
     */
    this.calculateDistanceMatrix(this.card.location);
    this._$timeout(() => {
      this.drawMap(this.card.location);
    });
  }

  calculateDistanceMatrix(location) {
    /* eslint-disable */
    const travelModes = [
      google.maps.TravelMode.DRIVING,
      google.maps.TravelMode.TRANSIT,
      google.maps.TravelMode.WALKING
    ];
    /* eslint-enable */

    angular.forEach(travelModes, travelMode => {
      this.LocationService.calculateDistanceMatrix(location, travelMode, (response, status) => {
        if (status !== 'OK') {
          this._$log.debug(`Error calculating distance matrix`);
          return;
        }

        this.distance[travelMode] = {
          distance: response.rows[0].elements[0].distance.text,
          duration: {
            text: response.rows[0].elements[0].duration.text,
            value: response.rows[0].elements[0].duration.value
          }
        };

        this._$scope.$apply();
      });
    });
  }

  drawMap(hospitalLocation) {
    const hospitalPosition = {
      lat: Number(hospitalLocation.latitude),
      lng: Number(hospitalLocation.longitude)
    };

    /* eslint-disable */
    const map = new google.maps.Map(document.getElementById(`map-${this.card.hospitalCode}`), {
      zoom: 10,
      center: hospitalPosition
    });
    /**
     * Places a PIN on hospital's location
     */
    const marker = new google.maps.Marker({
      position: hospitalPosition,
      map: map,
      draggable: true,
      animation: google.maps.Animation.BOUNCE,
    });

    /**
     * Places a PIN on user's current location
     */
    this.LocationService.deferred.promise.then(userPosition => {
      const markerOrigin = new google.maps.Marker({
        position: {
          lat: Number(userPosition.coords.latitude),
          lng: Number(userPosition.coords.longitude)
        },
        map: map
      });
    }, err => {
      this._$log.debug(`Unable to mark user's position on map \n${err}`);
    });
    /* eslint-enable */
  }

  joinQueue() {
    if (this.username) {
      this.QueueService.joinQueue({
        hospitalCode: this.card.hospitalCode,
        username: this.username
      }).then(response => {
        this.card = response.data;
        this.card.currentQueue = [{
          isCurrent: true,
          joinDate: new Date()
        }];

        // calculates size of the queue and user's current position
        this.card.currentPosition = response.data.queue.findIndex(element => element.username === this.username);
        this.card.queue = response.data.queue.length;

        this.startArrivalTimeCalc();
      }, err => {
        swal(
          'Falha!',
          err.data,
          'error'
        );
      });
    }
  }

  leaveQueue() {
    if (this.username) {
      this.QueueService.leaveQueue({
        hospitalCode: this.card.hospitalCode,
        username: this.username
      }).then(response => {
        this._$interval.cancel(this.arrivalTimeInterval);

        this.arrivalTimeDuration = null;
        response.data.queue = response.data.queue.length;
        this.card = response.data;
      }, err => {
        swal(
          'Falha!',
          err.data,
          'error'
        );
      });
    }
  }

  startArrivalTimeCalc() {
    this.arrivalTimeInterval = this._$interval(() => {
      return this.calculateArrivalTime();
    }, 1000);
  }

  calculateArrivalTime() {
    this._$log.debug('Calculating arrivalTime for current queue...');
    const now = moment(new Date()); // current date
    const joinDate = moment(new Date(this.card.currentQueue[0].joinDate));
    let duration = moment.duration(now.diff(joinDate));
    duration = moment.utc(duration.as('milliseconds')).format('HH:mm:ss');

    this.arrivalTimeDuration = duration;
  }

  $onDestroy() {
    if (this.arrivalTimeInterval) {
      this._$interval.cancel(this.arrivalTimeInterval);
    }
    this.SocketService.unWatch(this.card.hospitalCode);
  }

}
export const hospitalCard = {
  template: require('./hospital-card.html'),
  bindings: {
    card: '<'
  },
  controller: HospitalCardController
};
