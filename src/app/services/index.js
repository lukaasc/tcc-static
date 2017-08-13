import angular from 'angular';

import {
  BaseService
} from './base.service';

export const serviceModule = 'serviceModule';

angular
  .module(serviceModule, [])
  .service('BaseService', BaseService);
