import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from '../user-office/shared/jwt.service';
import {AuthService} from '../user-office/shared/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private auth: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.jwtService.token;

    if (token) {
      headersConfig['Authorization'] = `${token}`;
    }
    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.jwtService.destroyToken();
          this.router.navigate(['/user', 'login'], {
            queryParams: {
              authFailed: true
            }
          });
          return throwError(error);
        }
        if (error.status === 400) {
          return throwError(error);
        }
      })
    );
  }
}
