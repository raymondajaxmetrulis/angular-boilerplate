import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { ITranslationService, I18NEXT_SERVICE } from 'angular-i18next';
import { InitOptions } from 'i18next';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  @Input() authed: boolean;
  @Input() role: string;
  isCollapsed: boolean = true;

  language: string = 'en';
  languages: string[] = ['en', 'es', 'fr'];

  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    public router: Router,
    @Inject(I18NEXT_SERVICE) private i18NSvc: ITranslationService
  ) {
  }

  ngOnInit(): void {
    this.i18NSvc.events.initialized.subscribe((options: InitOptions<object>) => {
      if (options) {
        this.updateState(this.i18NSvc.language);
      }
    });
  }

  async login(): Promise<void> {
    await this.oktaAuth.signInWithRedirect({originalUri: '/'});
  }

  async logout(): Promise<void> {
    this.oktaAuth.closeSession();
    this.oktaAuth.revokeAccessToken();
    await this.oktaAuth.signOut();
    this.router.navigate(['/']);
  }

  changeLanguage(event: Event): void {
    const lang = (event.target as HTMLInputElement).value;
    this.i18NSvc.changeLanguage(lang).then(() => {
      this.updateState(lang);
    });
  }

  private updateState(lang: string): void {
    this.language = lang;
  }
}
