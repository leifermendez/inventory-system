import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {animate, style, transition, trigger} from "@angular/animations";
import {faTimes}
  from '@fortawesome/free-solid-svg-icons';
import {RestService} from "../../rest.service";

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
export class ErrorLayerComponent implements OnInit, AfterViewInit {
  errorIn: any;
  @ViewChild('btnClose') someInput: ElementRef;

  @Input()
  get error() {
    return this.errorIn;
  }

  @Output() errorChange = new EventEmitter();

  set error(val) {
    this.errorIn = val;
    this.errorChange.emit(this.errorIn);
  }

  private animationItem: AnimationItem;
  faTimes = faTimes

  constructor(private ngZone: NgZone, public rest: RestService) {

  }

  error404: AnimationOptions = {
    path: '/assets/images/404.json',
  };

  error409: AnimationOptions = {
    path: '/assets/images/409.json',
  };

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  test = () => {
    const btn = document.querySelector('.close-icon')
    // @ts-ignore
    btn.click();
  }

  close = () => {
    this.error = null
  }


}
