import {Component, OnInit} from '@angular/core';
import {faTruck, faFileAlt, faBox, faFolderOpen, faCrown, faChartPie, faUsers, faAngleRight,
faCashRegister}
  from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  faCrown = faCrown
  faChartPie = faChartPie
  faUsers = faUsers
  faTruck = faTruck
  faAngleRight = faAngleRight
  faCashRegister = faCashRegister
  public menu: any = [
    {
      icon: faChartPie
    },
    {
      icon: faBox
    },
    {
      icon: faFileAlt
    },
    {
      icon: faCashRegister
    },
    {
      icon: faUsers
    },
    {
      icon: faFolderOpen
    },
    {
      icon: faTruck
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
