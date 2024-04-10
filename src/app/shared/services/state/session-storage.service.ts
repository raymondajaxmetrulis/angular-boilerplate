import { Injectable } from '@angular/core';

const APP_PREFIX = '';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {}

  setItem(key: string, value: string): void {
    if (value) {
      window.sessionStorage.setItem(`${APP_PREFIX}${key}`, JSON.stringify(value));
    }
  }

  removeItem(key: string): void {
    window.sessionStorage.removeItem(`${APP_PREFIX}${key}`);
  }

  clear(): void {
    window.sessionStorage.clear();
  }
}
