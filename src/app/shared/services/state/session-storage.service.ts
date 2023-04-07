import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Requestor } from 'app/shared/models/requestor.model';
import { User } from 'app/shared/models/user.model';

const APP_PREFIX = '';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(public router: Router) {}

  setItem(key: string, value: string): void {
    if (value) {
      window.sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }
  }

  getItem(key: string): User | Requestor {
    const returnValue = window.sessionStorage.getItem(`${APP_PREFIX}${key}`);

    if (returnValue === null) {
      return null;
    } else {
      return JSON.parse(returnValue);
    }
  }

  setPageState(route: string, page: number, pageSize: number) {
    const pageData = { page: page, pageSize: pageSize };
    this.setItem(route, JSON.stringify(pageData));
  }

  getPageState(url: string): {page: number, pageSize: number} {
    const returnValue = window.sessionStorage.getItem(`${APP_PREFIX}${url}`);
    return returnValue ? JSON.parse(JSON.parse(returnValue)) : { page: 1, pageSize: 10 };
  }

  removeItem(key: string): void {
    window.sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  clear(): void {
    window.sessionStorage.clear();
  }
}
