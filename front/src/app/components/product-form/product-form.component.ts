import {Component, ElementRef, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {
  faLifeRing,
  faSave,
  faCheckCircle,
  faTrashAlt,
  faTimesCircle,
  faHandPointer
} from '@fortawesome/free-regular-svg-icons';
import {faSearchPlus} from '@fortawesome/free-solid-svg-icons';
import {AnimationOptions} from "ngx-lottie";
import {CurrencyMaskInputMode} from "ngx-currency";
import {RestService} from "../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../share.service";
import {AnimationItem} from "lottie-web";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {ModalUserComponent} from "../modal-user/modal-user.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalImageComponent} from "../modal-image/modal-image.component";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({transform: 'translateY(-20%)', opacity: '.6'}),
        animate('0.15s ease-in')
      ])
    ])
  ]
})
export class ProductFormComponent implements OnInit {

  @ViewChild('valueInput', {static: true}) valueInput: ElementRef;
  @Input() content: string;
  public form: FormGroup;
  public prices: any = []
  files: File[] = [];
  bsModalRef: BsModalRef;
  public optionsMenu: any = [
    {
      name: 'Save',
      icon: faSave
    }
  ]
  faTrashAlt = faTrashAlt
  faHandPointer = faHandPointer
  faCheckCircle = faCheckCircle
  options: AnimationOptions = {
    path: '/assets/images/drop.json',
  };
  private animationItem: AnimationItem;
  priceTmp = 0;

  editorContent: object = {
    type: 'doc',
    content: []
  };
  public id: any = null;
  itemsAsObjects = [];
  itemsAsCategories = [];
  public deposits = [];
  public providers = [];
  public data = [];
  public currency: any = null;
  public currencySymbol: any = null;
  selectedCity: any;

  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router,
    public share: ShareService,
    private modalService: BsModalService,
    private ngZone: NgZone
  ) {

  }

  public ngxCurrencyOptions = {
    prefix: ``,
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true,
    max: 250_000_000,
    inputMode: CurrencyMaskInputMode.FINANCIAL,
  };

  ngOnInit(): void {
    const {currency, currencySymbol} = this.share.getSettings();
    this.currency = currency;
    this.currencySymbol = currencySymbol;
    this.ngxCurrencyOptions = {
      ...this.ngxCurrencyOptions, ...{
        prefix: `${currency} `
      }
    }

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categories: [''],
      // deposit: ['', Validators.required],
      // provider: ['', Validators.required],
      sku: ['', Validators.required],
      tag: [''],
      gallery: [''],
      prices: ['', Validators.required],
      measures: ['']
    });


    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
      if (this.id.length && this.id !== 'add') {
        this.loadItem();
      }
    });

  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    // this.animationItem.stop();
  }

  tt = () => {
    this.form.get('prices').setValidators([Validators.required])
    // this.form.controls['email'].setErrors({'incorrect': true});
  }

  changePrices = () => {

    if (!this.prices.length) {
         this.form.get('prices').setValidators([Validators.required]);
      this.form.controls.prices.reset();
    } else {
      this.form.get('prices').clearValidators();
      this.form.controls.prices.reset();
    }
  };

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

  onSelect(event) {

    event.addedFiles.map(async i => {
      i.base = await this.share.toBase64(i);
    })
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  addPrice = (e) => {

    this.prices.push({
      amount: this.priceTmp
    });
    this.priceTmp = 0;
    this.changePrices();
  }

  viewImage = (e, data: any = {}) => {
    e.stopPropagation();
    this.open(data)
  }

  editorContentChange(doc: object) {
    this.editorContent = doc;
  }

  deletePrice = (i) => {
    this.prices.splice(i, 1)
    this.changePrices();
  }

  onFocus = (e) => {
    this.priceTmp = null
  }


  loadItem = () => {
    this.rest.get(`products/${this.id}`).subscribe(res => {
      const {prices, gallery} = res;
      this.prices = prices;
      this.files = gallery;
      this.form.patchValue(res)
    })
  }

  loadProviders = () => {
    this.rest.get(`providers?limit=1000`).subscribe(res => {
      this.providers = this.parseData(res);
    })
  }

  loadDeposits = () => {
    this.rest.get(`deposits?limit=1000`).subscribe(res => {
      this.deposits = this.parseData(res);
    })
  }

  cbList = () => {
    this.router.navigate(['/', 'products'])
  }

  cbTrash = () => {
    this.rest.delete(`products/${this.id}`)
      .subscribe(res => this.cbList())
  }

  onSubmit(): void {
    const method = (this.id) ? 'patch' : 'post';
    this.form.patchValue({prices: this.prices})
    const checkNewImages = this.files.find((a: any) => (a.base));
    const images = this.getImageUp(this.files)
    this.loadImages().then(res => this.submitData({gallery: [...images, ...res['data']]}))
  }

  submitData = (data: any = {}) => {
    data = {...this.form.value, ...data};
    const method = (this.id) ? 'patch' : 'post';
    this.rest[method](`products${(method === 'patch') ? `/${this.id}` : ''}`,
      data)
      .subscribe(res => {
        this.cbList()
      })
  }

  loadImages = () => new Promise((resolve, reject) => {

    const formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append("files[]", this.files[i]);
    }
    this.rest.post(`storage`, formData, true, {})
      .subscribe(res => {
        resolve(res)
      }, error => {
        reject(error)
      })
  })

  open(data: any = null) {
    const initialState = {
      section: data
    };

    this.bsModalRef = this.modalService.show(
      ModalImageComponent,
      Object.assign({initialState}, {
        class: 'modal-light-zoom',
        ignoreBackdropClick: false
      })
    );
  }


  parseData = (data: any) => {
    // const tmp = [];
    // data.docs.map(a => tmp.push()
    return data.docs;
  }

  getImageUp = (images: any[]) => {
    return images.filter(a => (a._id));
  }

  parseImage = (data: any = {}) => {
    return (data.base) ? data.base : data.large;
  }
}
