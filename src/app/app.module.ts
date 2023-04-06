import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuth, OktaAuthOptions } from '@okta/okta-auth-js';
import { OKTA_CONFIG, OktaAuthModule } from '@okta/okta-angular';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { environment } from 'env/environment';
import { NavModule } from './common/nav.module';
import { HttpClientModule } from '@angular/common/http';

const oktaConfig: OktaAuthOptions = {
  issuer: environment.oktaIssuer,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email', 'groups', 'groups_okta_users', 'org_info', 'offline_access'],
  responseType: 'code',
  pkce: true,
};

const oktaAuth = new OktaAuth(oktaConfig);

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
    NavModule
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
