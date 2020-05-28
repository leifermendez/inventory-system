import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {RestService} from "./rest.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private rest: RestService,
              private router: Router,
              private cookieService: CookieService) {
  }

  public login = (data: any) => new Promise((resolve, reject) => {
    this.rest.post(`login`,
      data)
      .subscribe(res => {
        console.log(res)
        this.cookieService.set(
          'session',
          res.session,
          environment.daysTokenExpire,
          '/');
        this.cookieService.set(
          'user',
          JSON.stringify(res.user),
          environment.daysTokenExpire,
          '/');
        resolve(res);
      }, error => {
        reject(error);
      });
  });

  public logout = () => new Promise((resolve, reject) => {
    try {
      this.cookieService.delete('session', '/');
      this.cookieService.delete('user', '/');
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });

  checkSession = (verify = false, redirect = true, extra: any = {}) => {
    return new Promise((resolve, reject) => {
        if (this.cookieService.check('session')) {
          resolve(true);
        } else {
          if (redirect) {
            this.router.navigate(['/', 'oauth', 'login']);
          }
          reject(false);
        }
      }
    );
  };
}
