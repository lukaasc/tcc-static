import swal from 'sweetalert2';
import './hospital-card-list.scss';

class HospitalCardListController {
  /** @ngInject */
  constructor($http, UserService) {
    $http
      .get(`/api/queue/availableHospitals/${UserService.currentUser.username}`)
      .then(response => {
        this.cards = response.data;
      }, err => {
        swal(
          'Erro!',
          err.data,
          'error'
        );
      });
  }
}

export const hospitalCardList = {
  template: require('./hospital-card-list.html'),
  controller: HospitalCardListController
};
