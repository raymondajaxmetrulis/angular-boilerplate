import { Component, Inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth, CustomUserClaims, UserClaims } from '@okta/okta-auth-js';
import { environment } from 'env/environment';
import { skip } from 'rxjs';
import { UserService } from './shared/services/api/user.service';
import { StateService } from './shared/services/state/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  repoTitle: string = '';

  authed: boolean = false;
  role: string = '';

  constructor(
    public oktaAuthSvc: OktaAuthStateService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth,
    private meta: Meta,
    private title: Title,
    private usersSvc: UserService,
    public stateSvc: StateService
  ) {
    this.initCredentials();
  }

  ngOnInit(): void {
    this.title.setTitle(environment.appTitle);
    this.meta.addTags([
      { name: 'keywords', content: '' },
      { name: 'robots', content: 'index, follow' },
      { name: 'writer', content: '2023@ NMFTA' },
      { charset: 'UTF-8' }
    ]);
  }

  initCredentials(): void {
    this.oktaAuthSvc.authState$.pipe(skip(1)).subscribe(isAuthed => {
      if (isAuthed.isAuthenticated) {
        this.authed = isAuthed.isAuthenticated;
        this.oktaAuth.getUser().then((oktaUser: UserClaims<CustomUserClaims>) => {
          this.usersSvc.getUserByEmail(oktaUser.email).subscribe((user) => {
            this.stateSvc.setRole(user.roles[0]);
            this.stateSvc.setAuth(true);
          });
        });
      } else {
        this.stateSvc.setRole('Visitor');
        this.stateSvc.setAuth(false);
      }
    });
  }

}
