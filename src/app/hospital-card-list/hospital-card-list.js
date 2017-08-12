require('./hospital-card-list.scss');

class HospitalCardListController {
  /** @ngInject */
  constructor($http) {
    $http
      .get('app/hospital-card-list/hospital-card-list.json')
      .then(response => {
        this.cards = response.data;
      });
  }
}

export const hospitalCardList = {
  template: require('./hospital-card-list.html'),
  controller: HospitalCardListController
};
