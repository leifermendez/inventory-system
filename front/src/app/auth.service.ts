import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";
import {CookieService} from "ngx-cookie-service";
import {RestService} from "./rest.service";
import {ShareService} from "./share.service";
import {ModalWizardComponent} from "./components/modal-wizard/modal-wizard.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  bsModalRef: BsModalRef;

  constructor(private rest: RestService,
              private router: Router,
              private modalService: BsModalService,
              private share: ShareService,
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
        this.cookieService.set(
          'settings',
          JSON.stringify(res.settings),
          environment.daysTokenExpire,
          '/');
        resolve(res);
      }, error => {
        reject(error);
      });
  });

  public clear = () => {
    this.cookieService.delete('session', '/');
    this.cookieService.delete('user', '/');
  }

  public logout = () => new Promise((resolve, reject) => {
    try {
      this.clear();
      resolve(true);
    } catch (e) {
      reject(false);
    }
  });

  public openWizard = (data: any = {}) => {
    const initialState = {
      section: data
    };
    this.bsModalRef = this.modalService.show(
      ModalWizardComponent,
      Object.assign({initialState}, {
        class: 'modal-wizard',
        ignoreBackdropClick: false
      })
    );
  }


  checkSession = (verify = false, redirect = true, extra: any = {}) => {
    return new Promise((resolve, reject) => {
        if (this.cookieService.check('session')) {
          this.rest.get(`token`).subscribe(res => {

            if (res.user &&
              (res.user.role === 'admin') &&
              (!res.settings.currency || !res.settings.logo || !res.settings.currencySymbol || !res.settings.name)) {
              this.openWizard()
            }
            if (res.parentAccount && res.parentAccount.status) {
              this.share.limitAccount.emit(res.parentAccount)
            }
            this.cookieService.set(
              'session',
              res.session,
              environment.daysTokenExpire,
              '/');
            reject(false)
          }, error => {
            this.clear();
            this.redirectLogin();
          })
          resolve(true);
        } else {
          redirect ? this.redirectLogin() : null;
          reject(false);
        }
      }
    );
  };

  redirectLogin = () => {
    this.router.navigate(['/', 'oauth', 'login']);
  }
}
