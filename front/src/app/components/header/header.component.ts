import {Component, Input, OnInit} from '@angular/core';
import {faLifeRing, faBell} from '@fortawesome/free-regular-svg-icons';
import {faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {faTired} from '@fortawesome/free-solid-svg-icons';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";
import {ShareService} from "../../share.service";

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

  public menu: any = [
    {
      name: 'Ayuda',
      icon: faLifeRing
    },
    {
      name: 'Notificaciones',
      icon: faBell
    }
  ]

  constructor(private share: ShareService) {
  }

  ngOnInit(): void {
    this.share.limitAccount.subscribe(res => {
      if (res) {
        this.limitAccount = res;
      }
    })
  }

}
