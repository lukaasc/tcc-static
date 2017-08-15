import angular from 'angular';

import {
  BaseService
} from './base.service';

import {
  UserService
} from './user.service';

export const serviceModule = 'serviceModule';

angular
  .module(serviceModule, [])
  .service('BaseService', BaseService)
  .service('UserService', UserService);
