import {Component, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  options: AnimationOptions = {
    path: '/assets/images/404.json',
  };
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
  }

}
