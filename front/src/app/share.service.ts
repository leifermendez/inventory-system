import {EventEmitter, Injectable, Output} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  @Output() registerUser = new EventEmitter<string>();

  constructor(private router: Router) {
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

  public menuHistory = () => {

  }
}
