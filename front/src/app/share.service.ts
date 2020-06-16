import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {TranslateService} from "@ngx-translate/core";
import {CookieService} from "ngx-cookie-service";
import {ModalUserComponent} from "./components/modal-user/modal-user.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalUpdateComponent} from "./components/modal-update/modal-update.component";
import {ModalWizardComponent} from "./components/modal-wizard/modal-wizard.component";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  @Output() registerUser = new EventEmitter<string>();
  @Output() common = new EventEmitter<any>();
  @Output() addPurchase = new EventEmitter<any>();
  @Output() savePurchase = new EventEmitter<any>();
  @Output() loading = new EventEmitter<string>();
  @Output() copilot = new EventEmitter<any>();
  @Output() limitAccount = new EventEmitter<any>();
  @Output() changeSetting = new EventEmitter<any>();
  bsModalRef: BsModalRef;

  constructor(private router: Router,
              private sanitizer: DomSanitizer,
              private modalService: BsModalService,
              private cookie: CookieService,
              private translate: TranslateService) {
  }

  generate = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  public parseData = (data: any, source: string = '') => {
    try {
      const tmp = [];
      data.docs.map(a => tmp.push({
        ...a, ...{
          router: ['/', source, a._id]
        }
      }));
      return tmp;
    } catch (e) {
      return null;
    }
  }

  public goTo = (source: string = '') => this.router.navigate(['/', source, 'add'])

  public findInvalidControls(form: any) {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  public nextPage = (data: any) => {
    return data.nextPage;
  }

  public parseLoad = (src: string = '', source: string = '', fields = []) => {

    let q: (string | any[])[] = [source];

    q = (fields.length) ? [...q, ...fields] : [...q,
      ...[`?fields=name`,
        `&sort=name&order=-1`
      ]
    ]

    if (src && src.length > 2) {
      q.push(`&filter=${src}`);
    }
    return q;
  };

  public toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  public openCopilot = (section = null) => new Promise((resolve, reject) => {
    try {
      if (section) {
        const copilot = (this.cookie.get(section)) ? this.cookie.get(section) : null;
        if (copilot) {
          resolve(copilot)
        } else {
          resolve(null)
        }
      }
    } catch (e) {
      reject(null);
    }
  })

  public saveCopilot = (section = null) => new Promise((resolve, reject) => {
    try {
      this.cookie.set(section, '1', 365, '/')
      resolve(true)
    } catch (e) {
      reject(null);
    }
  })

  public confirm = () => new Promise((resolve, reject) => {
    this.translate.get("GENERAL").subscribe((res: string) => {
      // @ts-ignore
      const {ARE_YOU_SURE, ARE_YOU_SURE_SENTENCE, OK, ANY_ISSUE} = res;
      // console.log(res)
      Swal.fire({
        title: ARE_YOU_SURE,
        text: ARE_YOU_SURE_SENTENCE,
        icon: null,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: OK,
        footer: '<a href>' + ANY_ISSUE + '</a>'
      }).then((result) => {
        if (result.value) {
          resolve(true)
        } else {
          reject(false)
        }
      }).then()
    });

  })

  public openUpdateModal = (data: any = {}) => {
    const initialState = {
      section: data
    };
    this.bsModalRef = this.modalService.show(
      ModalUpdateComponent,
      Object.assign({initialState}, {
        class: 'modal-light-upgrade',
        ignoreBackdropClick: true
      })
    );
  }


  public getUserInfo = () => {
    try {
      return JSON.parse(this.cookie.get('user'))
    } catch (e) {
      return null
    }
  }

  public getSettings = () => {
    try {
      return JSON.parse(this.cookie.get('settings'))
    } catch (e) {
      return null
    }
  }


}
