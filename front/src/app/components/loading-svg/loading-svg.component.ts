import {Component, Input, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-loading-svg',
  templateUrl: './loading-svg.component.html',
  styleUrls: ['./loading-svg.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({opacity: '.6'}),
        animate('0.15s ease-in')
      ])
    ])
  ]
})
export class LoadingSvgComponent implements OnInit {
  @Input() progress = 0;
  @Input() error: any = null;
  options: AnimationOptions = {
    path: '/assets/images/loading.json',
  };

  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit(): void {
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    // this.animationItem.stop();
  }

  loopComplete(e): void {
    // e.stop().then();
    this.pause()
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.stop());
  }

  pause(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.setSegment(50, 118));
  }

}
