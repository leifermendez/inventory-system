import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  checkSession = (verify = false, redirect = true, extra: any = {}) => {
    return new Promise((resolve, reject) => {
        // this.router.navigate(['/', 'oauth', 'login']);
        // reject(false)
        resolve(true)

      }
    );
  };
}
