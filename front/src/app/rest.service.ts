import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {ShareService} from './share.service';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public headers: HttpHeaders;
  public readonly url: string = environment.api;

  constructor(public http: HttpClient, private router: Router, private sharedService: ShareService,
              private cookieService: CookieService,
              private route: ActivatedRoute,
              private translate: TranslateService) {


  }

  clearSession = () => {
    this.cookieService.delete('session', ' / ');
    this.cookieService.delete('user', ' / ');
    this.router.navigate(['/', 'list']);
  };

  parseHeader = () => {
    const token = this.cookieService.get('session');
    const header = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };
    if (token) {
      header['Authorization'] = `Bearer ${token}`;
    }
    return new HttpHeaders(header);
  };




  cookieCheck = () => {

  };

  localCheck = () => {

  };

  alertError = () => {

  };

  handleError = (code = 401, message = '', e: any = {}) => {
    try {
      let error = '';
      let subTitle = '';
      let parameterMissing = '';
      this.translate.get('ERROR.LABEL').subscribe((res: string) => {
        error = res;
      });
      this.translate.get('ERROR.SUB_LABEL').subscribe((res: string) => {
        subTitle = res;
      });

      this.translate.get('ERROR.PARAMETER_MISSING').subscribe((res: string) => {
        parameterMissing = res;
      });

      switch (code) {
        default:

          break;
      }
    } catch (e) {
      this.cookieService.delete('session');
      this.cookieService.delete('user');
      return 422;
    }

  };

  post(path = '', body = {}, toast = true): Observable<any> {
    try {
      return this.http.post(`${this.url}/${path}`, body, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              // this.sharedService.showError('Error', e.statusText);
            }
            this.handleError(e.status, e.statusText, e.error);
            return throwError({
              status: e.status,
              statusText: e.statusText,
              e
            });
          }),
        );
    } catch (e) {

    }
  }

  put(path = '', body = {}, toast = true): Observable<any> {
    try {
      return this.http.put(`${this.url}/${path}`, body, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              // this.sharedService.showError('Error', e.statusText);
            }
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          }),
        );
    } catch (e) {

    }
  }

  get(path = '', toast = true): Observable<any> {
    try {
      return this.http.get(`${this.url}/${path}`, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              // this.sharedService.showError('Error', e.statusText);
            }
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          }),
        );
    } catch (e) {

    }
  }

  delete(path = '', toast = true): Observable<any> {
    try {
      return this.http.delete(`${this.url}/${path}`, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              // this.sharedService.showError('Error', e.statusText);
            }
            this.handleError(e.status, e.statusText);
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          }),
        );
    } catch (e) {

    }
  }
}
