import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth, CustomUserClaims, UserClaims, AuthState } from '@okta/okta-auth-js';
import { environment } from 'env/environment';
import { Observable, skip } from 'rxjs';
import { UserService } from './shared/services/api/user.service';
import { StateService } from './shared/services/state/state.service';
import { User } from './shared/models/user.model';

import {
  Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, ActivatedRoute, Data
} from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  repoTitle: string;

  authed: boolean;
  role: string;

  constructor(
    private router: Router,
    public oktaAuthSvc: OktaAuthStateService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth,
    private meta: Meta,
    private title: Title,
    private usersSvc: UserService,
    public stateSvc: StateService,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map((route: ActivatedRoute) => {
          while (route.firstChild) route = route.firstChild;
          return route;
        }),
        filter((route: ActivatedRoute) => route.outlet === 'primary'),
        mergeMap((route: ActivatedRoute) => route.data)
      )
      .subscribe((event: Data) => this.updatePageTitle(event['title']));
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

    this.i18NextService.events.languageChanged.subscribe((lang: string) => {
      const root = this.router.routerState.root;
      if (root != null && root.firstChild != null) {
        const data: Observable<Data> = root.firstChild.data;
        this.updatePageTitle(data);
      }
    });
  }

  initCredentials(): void {
    this.oktaAuthSvc.authState$.pipe(skip(1)).subscribe((isAuthed: AuthState) => {
      if (isAuthed.isAuthenticated) {
        this.authed = isAuthed.isAuthenticated;
        this.oktaAuth.getUser().then((oktaUser: UserClaims<CustomUserClaims>) => {
          this.usersSvc.getUserByEmail(oktaUser.email).subscribe((user: User) => {
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

  updatePageTitle(title: Observable<Data>): void {
    title.subscribe((value: Data) => {
      this.title.setTitle(value['title']);
    })

  }

}
