import { APP_INITIALIZER, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NavModule } from './common/nav.module';
import { HttpClientModule } from '@angular/common/http';

import { i18Options } from 'locales/i18Next.options';

export function appInit(i18next: ITranslationService) {
  return () => i18next.init(i18Options);
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

    NavModule,
    I18NextModule.forRoot()
  ],
  providers: [
    I18N_PROVIDERS
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
