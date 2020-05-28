import {Component, OnInit} from '@angular/core';
import {
  faTruck, faFileAlt, faBox, faFolderOpen, faCrown, faChartPie, faUsers, faAngleRight,
  faCashRegister, faIndustry, faWarehouse
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
  faIndustry = faIndustry
  faAngleRight = faAngleRight
  faWarehouse = faWarehouse
  faCashRegister = faCashRegister
  public menu: any = [
    {
      name: 'Inicio',
      icon: faChartPie,
      route: ['/', 'home']
    },
    {
      name: 'Productos',
      icon: faBox,
      route: ['/', 'product']
    },
    {
      name: 'Pedidos',
      icon: faFileAlt,
      route: ['/', 'purchase']
    },
    {
      name: 'Pagos',
      icon: faCashRegister,
      route: ['/', 'payments']
    },
    {
      name: 'Usuarios',
      icon: faUsers,
      route: ['/', 'users']
    },
    {
      name: 'Carga y Descarga',
      icon: faWarehouse,
      route: ['/', 'deposits']
    },
    {
      name: 'Proveedores',
      icon: faIndustry,
      route: ['/', 'providers']
    }
  ]

  constructor() {
  }

  ngOnInit(): void {
  }

}
