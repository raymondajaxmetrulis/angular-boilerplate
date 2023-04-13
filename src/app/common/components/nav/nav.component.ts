import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  @Input() authed: boolean;
  @Input() role: string;
  isCollapsed: boolean = true;

  constructor(
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth,
    public router: Router
  ) {
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
}
