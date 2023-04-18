import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from 'env/environment';
import { NavModule } from './common/nav.module';
import { HttpClientModule } from '@angular/common/http';

import * as enTrans from "../locales/en.translation.json";
import * as esTrans from "../locales/es.translation.json";
import * as frTrans from "../locales/fr.translation.json";

const oktaConfig: OktaAuthOptions = {
  issuer: environment.oktaIssuer,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email', 'groups', 'groups_okta_users', 'org_info', 'offline_access'],
  responseType: 'code',
  pkce: true,
};

const oktaAuth = new OktaAuth(oktaConfig);

export function appInit(i18next: ITranslationService) {
  return () => i18next
    .init({
      supportedLngs: ['en', 'es', 'fr'],
      fallbackLng: 'en',
      debug: true,
      returnEmptyString: false,
      resources: {
        en: {
          translation: enTrans
        },
        es: {
          translation: esTrans
        },
        fr: {
          translation: frTrans
        }
      },
      ns: [
        'translation'
      ],
    });
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  }
];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    MatProgressSpinnerModule,

    OktaAuthModule,
    NavModule,
    I18NextModule.forRoot()
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
