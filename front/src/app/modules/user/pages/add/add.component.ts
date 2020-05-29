import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public history: any = [
    {
      name: 'Usuario',
      router: ['/', 'users']
    },
    {
      name: 'Nuevo',
      router: null
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
