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
import {ShareService} from "../../share.service";

@Component({
  selector: 'app-error-layer',
  templateUrl: './error-layer.component.html',
  styleUrls: ['./error-layer.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({transform: 'translateY(-20%)', opacity: '0'}),
        animate('0.1s ease-in')
      ]),
      transition(':leave', [
        animate('0.1s ease-out', style({transform: 'translateY(20%)', opacity: '1'}))
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

  private codes = []
  private animationItem: AnimationItem;
  faTimes = faTimes

  constructor(private ngZone: NgZone, public rest: RestService, private share: ShareService) {
    this.rest.catchError.subscribe(err => {
      if (this.codes.includes(err.code)) {
        this.error = null;
      }
    })
  }

  error404: AnimationOptions = {
    path: '/assets/images/404.json',
  };

  error409: AnimationOptions = {
    path: '/assets/images/409.json',
  };

  error422: AnimationOptions = {
    path: '/assets/images/422.json',
  };

  error401: AnimationOptions = {
    path: '/assets/images/warning.json',
  };

  error406: AnimationOptions = {
    path: '/assets/images/security.json',
  };


  error402: AnimationOptions = {
    path: '/assets/images/402.json',
  };


  error400: AnimationOptions = {
    path: '/assets/images/400.json',
  };

  error0: AnimationOptions = {
    path: '/assets/images/0.json',
  };


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log('--->', this.error)
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
