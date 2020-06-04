import {Component, Input, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {animate, style, transition, trigger} from "@angular/animations";
import {faTimes}
  from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-layer',
  templateUrl: './error-layer.component.html',
  styleUrls: ['./error-layer.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({opacity: '.6'}),
        animate('0.05s ease-in')
      ])
    ])
  ]
})
export class ErrorLayerComponent implements OnInit {
  @Input() error: any = null;
  private animationItem: AnimationItem;
  faTimes = faTimes

  constructor(private ngZone: NgZone) {
  }

  error404: AnimationOptions = {
    path: '/assets/images/404.json',
  };

  error409: AnimationOptions = {
    path: '/assets/images/409.json',
  };

  ngOnInit(): void {



  }

  close = () => this.error = null;



}
