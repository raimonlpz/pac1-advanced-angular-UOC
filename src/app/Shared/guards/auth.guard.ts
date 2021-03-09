import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
      return new Observable<boolean>(obs => {
        this.auth.userLoggedIn.subscribe(isLogged => {
          if (isLogged) { return obs.next(true); }
          this.router.navigateByUrl('/home');
          return obs.next(false);
        });
      });
  }
}
