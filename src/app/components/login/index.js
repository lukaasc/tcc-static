import angular from 'angular';

import {login} from './login';

export const loginModule = 'login';

angular
  .module(loginModule, [])
  .component('login', login);
