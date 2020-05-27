import {Component, OnInit} from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-working-box',
  templateUrl: './working-box.component.html',
  styleUrls: ['./working-box.component.css']
})
export class WorkingBoxComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/images/code.json',
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
