import { Injectable, Inject } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public role$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    public authStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth
  ) {}

  async setAuth(auth: boolean) {
    this.isAuthenticated$.next(auth);
  }

  async setRole(role: string) {
    this.role$.next(role);
  }
}
