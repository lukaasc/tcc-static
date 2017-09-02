import swal from 'sweetalert2';
import './hospital-card.scss';

class HospitalCardController {
  /** @ngInject */
  constructor($log, QueueService, UserService) {
    this._$log = $log;

    this.QueueService = QueueService;
    this.UserService = UserService;

    this.username = UserService.currentUser.username;
  }

  joinQueue() {
    if (this.username) {
      this.QueueService.joinQueue({
        hospitalCode: this.card.hospitalCode,
        username: this.username
      }).then(response => {
        this.card = response.data;
        this.card.currentQueue = [{
          isCurrent: true
        }];

        // calculates size of the queue and user's current position
        this.card.currentPosition = response.data.queue.findIndex(element => element.username === this.username);
        this.card.queue = response.data.queue.length;
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
}
export const hospitalCard = {
  template: require('./hospital-card.html'),
  bindings: {
    card: '<'
  },
  controller: HospitalCardController
};
