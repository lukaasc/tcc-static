import swal from 'sweetalert2';
import './hospital-card-list.scss';

class HospitalCardListController {
  /** @ngInject */
  constructor($http) {
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
  }
}

export const hospitalCardList = {
  template: require('./hospital-card-list.html'),
  controller: HospitalCardListController
};
