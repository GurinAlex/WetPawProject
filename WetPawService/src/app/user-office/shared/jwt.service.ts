import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class JwtService {

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  get token(): string {
    return localStorage.getItem('token');
  }
  destroyToken() {
    localStorage.clear();
  }
}
