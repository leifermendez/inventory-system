import {AfterViewInit, Component, Input, NgZone, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {AnimationItem} from "lottie-web";
import {AnimationOptions} from "ngx-lottie";
import {DeviceDetectorService} from "ngx-device-detector";
import {ShareService} from "../../share.service";

@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.css']
})
export class CopilotComponent implements OnInit, AfterViewInit {
  @Input() inside: any;
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone,
              private share: ShareService) {
  }

  copilot: AnimationOptions = {
    path: '/assets/images/swipe-left.json',
  };

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('Render')
      const copilotsElement = document.querySelectorAll('.copilot');
      console.log(copilotsElement)

      const element = copilotsElement[0];
      var rect = element.getBoundingClientRect();
      console.log(rect.top, rect.right, rect.bottom, rect.left);

    }, environment.copilotDelay)

  }

  skip = () => this.share.copilot.emit(false)


}


