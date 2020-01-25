import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {JwtService} from './jwt.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate{
  constructor(
    private auth: AuthService,
    private route: Router,
    private jwtService: JwtService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isUserAuthenticated()) {
      return true;
    } else {
      this.jwtService.destroyToken();
      this.route.navigate(['/user', 'login'], {
        queryParams: {
          loginAgain: true
        }
      });
    }
  }
}
