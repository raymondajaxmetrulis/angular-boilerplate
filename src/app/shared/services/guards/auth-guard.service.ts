import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router} from '@angular/router';
import { StateService } from '../state/state.service';
import { Role } from 'app/shared/enums/role';
import { Observable } from 'rxjs';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { PermissionsService } from '../permissions/permissions.service';
import { User } from 'app/shared/models/user.model';
import { UserService } from '../api/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    public stateSvc: StateService,
    public router: Router,
    public userSvc: UserService,
    public authStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) public oktaAuth: OktaAuth,
    public permissionsSvc: PermissionsService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable<boolean>(obs => {
      if (this.stateSvc.role$) {
        this.stateSvc.role$.subscribe((role: string) => {
          if (!route.data['allowedRoles'].includes(role) && role !== Role.SuperAdmin) {
            this.router.navigate(['/']);
            obs.next(false);
          }
          obs.next(true);
        })
      } else {
        this.authStateService.authState$.subscribe(isAuthed => {
          if (isAuthed.isAuthenticated) {
            this.oktaAuth.getUser().then(oktaUser => {
              this.userSvc.getUserByEmail(oktaUser.email).subscribe((user: User) => {
                if (!route.data['allowedRoles'].includes(user.roles[0]) && user.roles[0] !== Role.SuperAdmin) {
                  this.router.navigate(['/']);
                  obs.next(false);
                }
                obs.next(true);
              });
            });
          }
        });
      }
    });
  }
}
