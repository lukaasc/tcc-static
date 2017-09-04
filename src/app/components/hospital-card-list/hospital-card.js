import swal from 'sweetalert2';
import './hospital-card.scss';
import moment from 'moment/min/moment.min';

class HospitalCardController {

  /** @ngInject */
  constructor($interval, $log, $timeout, QueueService, UserService) {
    this._$interval = $interval;
    this._$log = $log;
    this._$timeout = $timeout;

    this.QueueService = QueueService;
    this.UserService = UserService;

    this.username = UserService.currentUser.username;
    this.arrivalTimeInterval = null;
    this.arrivalTimeDuration = null;
    this.mediumTime = null;
  }

  $onInit() {
    if (this.card.currentQueue[0]) {
      this.startArrivalTimeCalc();
    }

    this.QueueService.getMediumTime(this.card.hospitalCode).then(response => {
      this.mediumTime = response.data;
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
  }

}
export const hospitalCard = {
  template: require('./hospital-card.html'),
  bindings: {
    card: '<'
  },
  controller: HospitalCardController
};
