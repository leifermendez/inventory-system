import {Component, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-box-empty',
  templateUrl: './box-empty.component.html',
  styleUrls: ['./box-empty.component.css']
})
export class BoxEmptyComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/images/void.json',
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
    this.ngZone.runOutsideAngular(() => this.animationItem.setSegment(43,44));
  }
}
