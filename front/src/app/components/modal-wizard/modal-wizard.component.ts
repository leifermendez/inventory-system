import {Component, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-modal-wizard',
  templateUrl: './modal-wizard.component.html',
  styleUrls: ['./modal-wizard.component.css']
})
export class ModalWizardComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/images/wizard.json',
  };
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone, public bsModalRef: BsModalRef) {
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
