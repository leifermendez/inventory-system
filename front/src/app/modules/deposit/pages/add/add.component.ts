import {Component, OnInit} from '@angular/core';
import {RestService} from "../../../../rest.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private rest: RestService) {
  }

  public history: any = [
    {
      name: 'Depositos',
      router: ['/', 'deposits']
    },
    {
      name: 'Nuevo',
      router: null
    }
  ]

  ngOnInit(): void {
  }

}
