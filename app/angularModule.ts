import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';
import { BrowserModule } from '@angular/platform-browser';

import { UIRouterUpgradeModule, NgHybridStateDeclaration } from '@uirouter/angular-hybrid';
import { sampleAppModuleAngularJS } from './angularJSModule';

// Create a "future state" (a placeholder) for the Preferences
// AngularJS module which will be lazy loaded by UI-Router
export const prefsFutureState: NgHybridStateDeclaration = {
  name: 'prefs.**',
  url: '/prefs',
  loadChildren: () => import('./prefs/prefs.module').then(m => m.PrefsModule)
};

// Create a "future state" (a placeholder) for the Contacts
// Angular module which will be lazy loaded by UI-Router
export const contactsFutureState: NgHybridStateDeclaration = {
  name: 'contacts.**',
  url: '/contacts',
  loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule),
};

export function getDialogService($injector) {
  return $injector.get('DialogService');
}

export function getContactsService($injector) {
  return $injector.get('Contacts');
}

export function getAppConfig($injector) {
  return $injector.get('AppConfig');
}

// The main NgModule for the Angular portion of the hybrid app
@NgModule({
  imports: [
    BrowserModule,
    // Provide angular upgrade capabilities
    UpgradeModule,
    // Provides the @uirouter/angular directives and registers
    // the future state for the lazy loaded contacts module
    UIRouterUpgradeModule.forRoot({ states: [contactsFutureState, prefsFutureState] })
  ],
  providers: [
    // Register some AngularJS services as Angular providers
    { provide: 'DialogService', deps: ['$injector'], useFactory: getDialogService },
    { provide: 'Contacts', deps: ['$injector'], useFactory: getContactsService },
    { provide: 'AppConfig', deps: ['$injector'], useFactory: getAppConfig },
  ]
})
export class SampleAppModuleAngular {
  constructor(private upgrade: UpgradeModule) { }

  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [sampleAppModuleAngularJS.name], { strictDi: true });
  }
}
