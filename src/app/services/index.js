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

import socketService from './socket.service';

export const serviceModule = 'serviceModule';

angular
  .module(serviceModule, [])
  .service('BaseService', BaseService)
  .service('UserService', UserService)
  .service('QueueService', QueueService);

/**
 * Initiates socket.io for real-time updates
 */
socketService();
