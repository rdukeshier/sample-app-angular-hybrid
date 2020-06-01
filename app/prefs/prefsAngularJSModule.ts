import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';
import { PrefsComponent } from './prefs.component';
import { prefsState } from './prefs.states';

const prefsAngularJSModule = angular
  .module('prefs', ['ui.router'])
  .config(['$stateProvider', ($stateProvider) => $stateProvider.state(prefsState)])
  .directive('downgradedCmp', downgradeComponent({ component: PrefsComponent }));

export { prefsAngularJSModule };
