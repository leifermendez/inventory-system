import {Component, OnInit} from '@angular/core';
import {
  faAngleRight,
  faBox,
  faCartPlus,
  faCashRegister,
  faChartPie,
  faClipboardList,
  faCrown,
  faIndustry,
  faTruck,
  faUsers,
  faPlug,
  faTruckPickup,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {ShareService} from "../../share.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public logo: null;
  name: any;
  faCrown = faCrown
  faChartPie = faChartPie
  faCartPlus = faCartPlus
  faUsers = faUsers
  faTruck = faTruck
  faIndustry = faIndustry
  faAngleRight = faAngleRight
  faWarehouse = faWarehouse
  faCashRegister = faCashRegister
  faTruckPickup = faTruckPickup
  public menu: any = [
    {
      name: 'Inicio',
      icon: faChartPie,
      route: ['/', 'home']
    },
    {
      name: 'Pedidos',
      icon: faCartPlus,
      route: ['/', 'purchase']
    },
    {
      name: 'Productos',
      icon: faBox,
      route: ['/', 'products']
    },
    {
      name: 'Pagos',
      icon: faCashRegister,
      disable: true,
      route: ['/', 'payments']
    },
    {
      name: 'Usuarios',
      icon: faUsers,
      route: ['/', 'users']
    },
    {
      name: 'Inventario / Movimientos',
      icon: faClipboardList,
      route: ['/', 'inventory']
    },
    {
      name: 'Depositos',
      // disable: true,
      icon: faWarehouse,
      route: ['/', 'deposits']
    },
    {
      name: 'Proveedores',
      icon: faTruckPickup,
      route: ['/', 'providers']
    },
    {
      name: 'Complementos',
      icon: faPlug,
      disable: true,
      route: ['/', 'add-ons']
    }
  ]

  constructor(public auth: AuthService, private router: Router, private share: ShareService) {
  }

  ngOnInit(): void {
    const {settings} = this.share.getUserInfo();
    this.logo = settings.logo;
    this.name = settings.name;
  }

  logOut = () => {
    this.auth.logout().then(() => {
      this.router.navigate(['/', 'oauth'])
    })
  }

}
