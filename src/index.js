// vendor external imports
import angular from 'angular';
import 'jquery';
import 'bootstrap';

// angular route for state control
import 'angular-ui-router';
import routesConfig from './routes';

// landing page components
import {main} from './app/main';
import {header} from './app/header';
import {title} from './app/title';
import {footer} from './app/footer';

// custom components
import {hospitalCardListModule} from './app/hospital-card-list/index';

// stylesheet
import './index.scss';

angular
  .module('app', [hospitalCardListModule, 'ui.router'])
  .config(routesConfig)
  .component('app', main)
  .component('fountainHeader', header)
  .component('fountainTitle', title)
  .component('fountainFooter', footer);
