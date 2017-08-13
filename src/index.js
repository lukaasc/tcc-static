// vendor external imports
import angular from 'angular';
import 'angular-ui-router';
import 'jquery';
import 'bootstrap';
import 'font-awesome/scss/font-awesome.scss';

// angular route for state control

import routesConfig from './routes';

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

angular
  .module('app', [hospitalCardListModule, loginModule, serviceModule, 'ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('fountainHeader', header)
  .component('fountainTitle', title)
  .component('fountainFooter', footer);
