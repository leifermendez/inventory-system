import {Component, OnInit} from '@angular/core';
import {
  faTruck, faFileAlt, faBox, faFolderOpen, faCrown, faChartPie, faUsers, faAngleRight,
  faCashRegister
}
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
      name: 'Inicio',
      icon: faChartPie
    },
    {
      name: 'Productos',
      icon: faBox
    },
    {
      name: 'Pedidos',
      icon: faFileAlt
    },
    {
      name: 'Pagos',
      icon: faCashRegister
    },
    {
      name: 'Usuarios',
      icon: faUsers
    },
    {
      name: 'Carga y Descarga',
      icon: faFolderOpen
    },
    {
      name: 'Envios',
      icon: faTruck
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
