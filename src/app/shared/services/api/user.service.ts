import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'env/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url: string = environment.apiBaseURL + 'api/Users';

  constructor(
    private http: HttpClient
  ) {}

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.url + `/byemail/${email}`);
  }
}
