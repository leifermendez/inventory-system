import {Component, OnInit} from '@angular/core';
import {faLifeRing, faBell} from '@fortawesome/free-regular-svg-icons';
import {BsDropdownConfig} from "ngx-bootstrap/dropdown";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [{provide: BsDropdownConfig, useValue: {isAnimated: true, autoClose: true}}]
})
export class HeaderComponent implements OnInit {
  faLifeRing = faLifeRing
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
