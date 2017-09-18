import swal from 'sweetalert2';
import './hospital-card-list.scss';

class HospitalCardListController {
  /** @ngInject */
  constructor($http, UserService) {
    this.loading = true;
    $http
      .get(`/api/queue/availableHospitals/${UserService.currentUser.username}`)
      .then(response => {
        this.cards = response.data;
        this.loading = false;
      }, err => {
        swal(
          'Erro!',
          err.data,
          'error'
        );
        this.loading = false;
      });
  }
}

export const hospitalCardList = {
  template: require('./hospital-card-list.html'),
  controller: HospitalCardListController
};
