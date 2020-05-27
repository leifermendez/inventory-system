import {Component, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-locked-box',
  templateUrl: './locked-box.component.html',
  styleUrls: ['./locked-box.component.css']
})
export class LockedBoxComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/images/warning.json',
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
