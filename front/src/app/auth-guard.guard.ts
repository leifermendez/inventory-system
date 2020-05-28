import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private auth: AuthService) {

  }

  canActivate() {
    return this.auth.checkSession(true, true).then(a => {
      return true;
    }).catch(e => {
      return false;
    });
  }

}
