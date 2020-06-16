import {Component, Inject, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {BsModalRef} from "ngx-bootstrap/modal";
import {
  faTimes
}
  from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DemoFilePickerAdapter} from "../../demo-file-picker.adapter";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {ShareService} from "../../share.service";

@Component({
  selector: 'app-modal-wizard',
  templateUrl: './modal-wizard.component.html',
  styleUrls: ['./modal-wizard.component.css']
})
export class ModalWizardComponent implements OnInit {
  adapter = new DemoFilePickerAdapter(this.http, this.cookieService);
  public form: FormGroup;
  faTimes = faTimes
  options: AnimationOptions = {
    path: '/assets/images/wizard.json',
  };
  public preview = {
    image: null,
    blob: null
  }

  constructor(private ngZone: NgZone, public bsModalRef: BsModalRef,
              private http: HttpClient,
              private share: ShareService,
              private sanitizer: DomSanitizer,
              private cookieService: CookieService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      currencySymbol: [''],
      logo: [''],
    });
  }

  reset = () => {
    this.preview = {
      image: null,
      blob: null
    }
  }

  close = () => {
    this.bsModalRef.hide()
  }

  update = () => {
    const {name, currency, currencySymbol} = this.form.value;
    const {_id} = this.share.getSettings()
    const formData = new FormData();
    formData.append('logo', this.preview.blob)
    formData.append('name', name)
    formData.append('currency', currency)
    formData.append('currencySymbol', currencySymbol)

    this.saveRest(`settings/${_id}`, formData).subscribe(res => {
        this.share.changeSetting.emit(res);
        this.cookieService.set(
          'settings',
          JSON.stringify(res),
          environment.daysTokenExpire,
          '/');

        this.bsModalRef.hide()
      },
      error => console.log('err', error))


  }

  fileAdded($event: any) {
    const unsafeImg = URL.createObjectURL($event.file);
    const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    this.preview = {
      blob: $event.file,
      image
    }
  }

  parseHeader = () => {
    const token = this.cookieService.get('session');
    let header = {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    };
    return new HttpHeaders(header);
  };

  saveRest(path = '', body = {}): Observable<any> {
    try {
      return this.http.patch(`${environment.api}/${path}`, body,
        {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
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
}
