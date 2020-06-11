import { Component, OnInit } from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public source = 'deposits';
  public history: any = [
    {
      name: 'Complementos'
    }
  ]

  options: AnimationOptions = {
    path: '/assets/images/add-ons.json',
  };
  private animationItem: AnimationItem;
  constructor() { }

  ngOnInit(): void {
  }

}
