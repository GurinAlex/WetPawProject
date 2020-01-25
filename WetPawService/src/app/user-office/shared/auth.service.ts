import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {User} from '../../shared/interfaces';
import {catchError, distinctUntilChanged, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {JwtService} from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  // private currentUserSubject = new BehaviorSubject<User>({} as User);
  // public currentUser$ = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private jwtService: JwtService,
    private http: HttpClient) {
  }
  setAuthUser(user: User) {
    if (user.token) {
      this.jwtService.saveToken(user.token);
      this.setCurrentUser(user.username);
      // this.currentUserSubject.next(user);
    }
  }
  setCurrentUser(name: string) {
    localStorage.setItem('user_username', name);
  }

  getUsername() {
    return localStorage.getItem('user_username');
  }

  login(user: User): Observable<User> {
    return this.http.post(`${environment.apiKey}/users/login`, user)
      .pipe(
        map((userData: User) => {
          this.setAuthUser(userData);
          // return userData;
        }),
        catchError(this.handleError.bind(this))
      );
  }

  signup(user: User): Observable<any> {
    return this.http.post(`${environment.apiKey}/users`, user)
      .pipe(
        map((userData: User) => {
          this.setAuthUser(userData);
          // return userData;
        }),
        catchError(this.handleError.bind(this))
      );
  }
  profile(username: string): Observable<User> {
    return this.http.get(`${environment.apiKey}/users/${username}`)
      .pipe(
        map((userData: User) => {
          return userData;
        }));
  }

  isUserAuthenticated(): boolean {
    return !!this.jwtService.token;
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error.msg;

    switch (message) {
      case 'INVALID_LOGIN':
        this.error$.next('Неверный логин или пароль');
        break;
      case 'email or username already exists':
        this.error$.next('E-mail или имя уже заняты');
        break;
    }
    return throwError(error);
  }
}
