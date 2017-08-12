import angular from 'angular';

import {hospitalCard} from './hospital-card';
import {hospitalCardList} from './hospital-card-list';

export const hospitalCardListModule = 'hospitalCardList';

angular
  .module(hospitalCardListModule, [])
  .component('hospitalCard', hospitalCard)
  .component('hospitalCardList', hospitalCardList);
