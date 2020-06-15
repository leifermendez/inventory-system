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
  faWarehouse
} from '@fortawesome/free-solid-svg-icons';

import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {ShareService} from "../../share.service";
import {ModalImageComponent} from "../modal-image/modal-image.component";
import {ModalProfileComponent} from "../modal-profile/modal-profile.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  public logo: null;
  bsModalRef: BsModalRef;
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
      icon: faWarehouse,
      route: ['/', 'deposits']
    },
    {
      name: 'Proveedores',
      icon: faIndustry,
      route: ['/', 'providers']
    },
    {
      name: 'Complementos',
      icon: faPlug,
      disable: true,
      route: ['/', 'add-ons']
    }
  ]

  constructor(public auth: AuthService, private router: Router, private share: ShareService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    const {settings} = this.share.getUserInfo();
    this.logo = settings.logo;
    this.name = settings.name;
  }

  open(data: any = null) {
    const initialState = {
      section: data
    };

    this.bsModalRef = this.modalService.show(
      ModalProfileComponent,
      Object.assign({initialState}, {
        class: 'modal-profile-small',
        ignoreBackdropClick: false
      })
    );
  }


  logOut = () => {
    this.auth.logout().then(() => {
      this.router.navigate(['/', 'oauth'])
    })
  }

}
