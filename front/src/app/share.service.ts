import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {TranslateService} from "@ngx-translate/core";

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

  constructor(private router: Router,
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
    const tmp = [];
    data.docs.map(a => tmp.push({
      ...a, ...{
        router: ['/', source, a._id]
      }
    }));
    return tmp;
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
        footer: '<a href>'+ANY_ISSUE+'</a>'
      }).then((result) => {
        if (result.value) {
          resolve(true)
        } else {
          reject(false)
        }
      }).then()
    });

  })
}
