import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor() {
  }

  public history: any = [
    {
      name: 'Proveedores',
      router: ['/', 'providers']
    },
    {
      name: 'Nuevo',
      router: null
    }
  ]

  ngOnInit(): void {
  }


}
