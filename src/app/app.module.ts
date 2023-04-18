import { APP_INITIALIZER, InjectionToken, LOCALE_ID, NgModule, PLATFORM_ID, Provider } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';
import { I18NEXT_SERVICE, I18NextLoadResult, I18NextModule, I18NextTitle, ITranslationService } from 'angular-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from 'env/environment';
import { NavModule } from './common/nav.module';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import i18nextOptions from './i18next.options';

const oktaConfig: OktaAuthOptions = {
  issuer: environment.oktaIssuer,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email', 'groups', 'groups_okta_users', 'org_info', 'offline_access'],
  responseType: 'code',
  pkce: true,
};

const oktaAuth = new OktaAuth(oktaConfig);

export function appInit(i18next: ITranslationService, platformId: InjectionToken<object>) {
  return () => {
    if (!isPlatformBrowser(platformId)) {
      return Promise.resolve();
    }
    const promise: Promise<I18NextLoadResult> = i18next
      .use(HttpApi)
      .use(LanguageDetector)
      .init(i18nextOptions);
    return promise;
  };
}

export function localeIdFactory(i18next: ITranslationService) {
  return i18next.language;
}

export const I18N_PROVIDERS: Provider[] = [
  {
    provide: APP_INITIALIZER,
    useFactory: appInit,
    deps: [I18NEXT_SERVICE, PLATFORM_ID],
    multi: true
  },
  {
    provide: LOCALE_ID,
    deps: [I18NEXT_SERVICE],
    useFactory: localeIdFactory
  },
  {
    provide: Title,
    useExisting: I18NextTitle
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
