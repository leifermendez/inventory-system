import {Component, Input, OnInit} from '@angular/core';
import {faLifeRing, faBell} from '@fortawesome/free-regular-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faTired} from '@fortawesome/free-solid-svg-icons';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {ShareService} from "../../share.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class HeaderComponent implements OnInit {
  @Input() label: string;
  @Input() history: any = [];
  public limitAccount: any = null;
  faTired = faTired
  faLifeRing = faLifeRing
  faAngleRight = faAngleRight
  faBell = faBell
  public form: FormGroup;
  public menu: any = [
    {
      name: 'Ayuda',
      icon: faLifeRing,
      route: ['/', 'help']
    },
    {
      name: 'Notificaciones',
      icon: faBell,
      route: ['/', 'notification']
    }
  ]

  constructor(private share: ShareService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      q: ['']
    });

    this.share.limitAccount.subscribe(res => {
      if (res) {
        this.limitAccount = res;
      }
    })
  }

  search = () => {
    this.router.navigate(['/', 'search'], {queryParams: this.form.value})
    console.log(this.form.value)
  }
}
