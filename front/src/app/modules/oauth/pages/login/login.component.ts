import { Component, OnInit } from '@angular/core';
import {AnimationItem} from "lottie-web";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/images/play.json',
  };
  constructor() {
  }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
