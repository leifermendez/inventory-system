import {Component, NgZone, OnInit} from '@angular/core';
import {AnimationItem} from "lottie-web";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.css']
})
export class ModalProfileComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/images/testers.json',
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
    this.ngZone.runOutsideAngular(() => this.animationItem.setSegment(43, 44));
  }

}
