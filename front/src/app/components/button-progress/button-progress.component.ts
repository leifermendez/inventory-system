import {Component, EventEmitter, Input, NgZone, OnInit, Output} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-button-progress',
  templateUrl: './button-progress.component.html',
  styleUrls: ['./button-progress.component.css']
})
export class ButtonProgressComponent implements OnInit {
  @Output() cbClose = new EventEmitter<any>();
  @Input() width = '100px';
  faTimes = faTimes
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone) {
  }


  ngOnInit(): void {
  }

  lottie: AnimationOptions = {
    path: '/assets/images/circle-progress.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    // this.ngZone.runOutsideAngular(() => this.animationItem.setSegment(0,80));
    // this.animationItem.stop();
  }

  loopComplete(e): void {
    // e.stop().then();
    console.log(0);
    // this.pause()
  }

  play(): void {
    console.log('fef')
    this.ngZone.runOutsideAngular(() => this.animationItem.play());
  }


  pause(): void {
    console.log('fef')
    this.ngZone.runOutsideAngular(() => this.animationItem.pause());
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.pause());
  }

  end(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.pause());
    this.cbClose.emit()
  }

  init(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.setSegment(0, 194));
  }

  o = () => {
    console.log('dsdsd')
  }
}
