import {Component, OnInit} from '@angular/core';
import {ShareService} from "../../share.service";
import {BsModalRef} from "ngx-bootstrap/modal";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {FormBuilder, Validators} from "@angular/forms";
import {faAngleLeft, faExclamation, faSave} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({transform: 'translateY(-20%)', opacity: '0'}),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({transform: 'translateY(20%)', opacity: '1'}))
      ])
    ]),
    trigger('swipeR', [
      transition(':enter', [
        style({transform: 'translate(14%, 0px)', opacity: '0'}),
        animate('0.2s ease-in')
      ]),
      transition(':leave', [
        animate('0.2s ease-out', style({transform: 'translate(14%, 0px)', opacity: '1'}))
      ])
    ])
  ]

})
export class ModalProductComponent implements OnInit {
  public select: any = false;
  form: any;
  prices: any = []
  providers: any = []
  faAngleLeft = faAngleLeft;
  faSave = faSave;
  faExclamation = faExclamation;
  public currency: any = null;
  public currencySymbol: any = null;

  constructor(private share: ShareService,
              private formBuilder: FormBuilder,
              public bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    const {currency, currencySymbol} = this.share.getSettings();
    this.currency = currency;
    this.currencySymbol = currencySymbol;
    this.form = this.formBuilder.group({
      price: ['', Validators.required],
      qty: ['', Validators.required]
    });
  }

  getClick($event: any) {
    this.select = $event;
    const {prices, providers} = $event;
    this.prices = prices;
    this.providers = providers;

  }

  onSubmit() {
    const {qty} = this.form.value;
    console.log(this.form.value)
    this.select = {
      ...this.select,
      ...{qty}
    };
    console.log(this.select)
    this.share.common.emit(this.select)
    this.bsModalRef.hide()
  }

  selectPrice($event: any = {}) {
    this.select = {...this.select, ...{prices: [$event]}}
  }
}
