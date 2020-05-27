import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService: AuthService) {

  }

  canActivate() {
    return this.authService.checkSession(true, true).then(a => {
      return true;
    }).catch(e => {
      return false;
    });
  }

}
