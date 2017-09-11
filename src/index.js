// vendor external imports
import angular from 'angular';
import 'angular-ui-router';
import 'angular-cookies';
import 'angularjs-toaster';
import 'angular-animate';
import 'jquery';
import 'bootstrap';
import 'font-awesome/scss/font-awesome.scss';

// angular route for state control

import {routesConfig, checkUserAuthentication} from './routes';

// custom services
import {serviceModule} from './app/services';

// landing page components
import {main} from './app/components/main';
import {header} from './app/components/header';
import {title} from './app/components/title';
import {footer} from './app/components/footer';

// custom components
import {hospitalCardListModule} from './app/components/hospital-card-list';
import {loginModule} from './app/components/login';

// stylesheet
import './index.scss';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'angularjs-toaster/toaster.min.css';

angular
  .module('app', [hospitalCardListModule, loginModule, serviceModule, 'ui.router', 'ngCookies', 'toaster', 'ngAnimate'])
  .config(routesConfig)
  .run(checkUserAuthentication)
  .component('app', main)
  .component('fountainHeader', header)
  .component('fountainTitle', title)
  .component('fountainFooter', footer);
