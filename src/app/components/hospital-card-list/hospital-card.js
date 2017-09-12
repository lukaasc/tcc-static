import swal from 'sweetalert2';
import toastr from 'toastr/build/toastr.min.js';
import './hospital-card.scss';
import moment from 'moment/min/moment.min';

class HospitalCardController {

  /** @ngInject */
  constructor($interval, $log, $scope, QueueService, UserService, SocketService) {
    this._$interval = $interval;
    this._$log = $log;

    this.QueueService = QueueService;
    this.UserService = UserService;
    this.SocketService = SocketService;

    this.username = UserService.currentUser.username;
    this.arrivalTimeInterval = null;
    this.arrivalTimeDuration = null;
    this.mediumTime = null;

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
