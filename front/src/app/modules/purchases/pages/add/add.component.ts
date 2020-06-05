import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public id: any = false;

  constructor(private route: ActivatedRoute) {
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

}
