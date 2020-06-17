import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../../../share.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public id: any = false;

  constructor(private route: ActivatedRoute,
              private share: ShareService,
              public router: Router) {
  }

  public history: any = [
    {
      name: 'Pedidos',
      router: ['/', 'purchase']
    },
    {
      name: 'Nuevo',
      router: null
    }
  ]

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
    });
  }

  save = () => {
      this.share.confirm().then(() => {
        this.share.savePurchase.emit(true)
      })
  }

  cbList() {
    this.router.navigate(['/', 'purchase'])
  }

  cbAdd() {
    this.share.addPurchase.emit(true)
  }
}
