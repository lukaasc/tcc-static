import angular from 'angular';

import {
  BaseService
} from './base.service';

import {
  UserService
} from './user.service';

import {
  QueueService
} from './queue.service';

import {
  LocationService
} from './location.service';

import {
  RecommendationService
} from './recommendation.service';

import SocketService from './socket.service';

export const serviceModule = 'serviceModule';

angular
  .module(serviceModule, [])
  .service('BaseService', BaseService)
  .service('UserService', UserService)
  .service('QueueService', QueueService)
  .service('LocationService', LocationService)
  .service('RecommendationService', RecommendationService)
  .factory('SocketService', SocketService);
