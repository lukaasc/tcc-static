import swal from 'sweetalert2';
import './hospital-card-list.scss';

class HospitalCardListController {
  /** @ngInject */
  constructor($http, UserService) {
    $http
      .get('/api/queue/availableHospitals')
      .then(response => {
        this.cards = response.data;
      }, err => {
        swal(
          'Erro!',
          err.data,
          'error'
        );
      });

    this.userCurrentQueue = UserService.currentUser.currentQueue;
  }
}

export const hospitalCardList = {
  template: require('./hospital-card-list.html'),
  controller: HospitalCardListController
};
