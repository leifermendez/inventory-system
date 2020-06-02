import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {faLifeRing, faSave, faCheckCircle, faTrashAlt} from '@fortawesome/free-regular-svg-icons';

import {CurrencyMaskInputMode} from "ngx-currency";
import {RestService} from "../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../share.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @ViewChild('valueInput', {static: true}) valueInput: ElementRef;
  @Input() content: string;
  public form: FormGroup;
  public prices: any = []
  public optionsMenu: any = [
    {
      name: 'Save',
      icon: faSave
    }
  ]
  faTrashAlt = faTrashAlt
  faSave = faSave
  faCheckCircle = faCheckCircle
  faLifeRing = faLifeRing

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

  selectedCity: any;

  public ngxCurrencyOptions = {
    prefix: 'MXN ',
    thousands: '.',
    decimal: ',',
    allowNegative: false,
    nullable: true,
    max: 250_000_000,
    inputMode: CurrencyMaskInputMode.FINANCIAL,
  };

  addPrice = (e) => {
    console.log('price', e)
    this.prices.push({
      amount: this.priceTmp
    });
    this.priceTmp = 0;
  }

  editorContentChange(doc: object) {
    this.editorContent = doc;
  }

  deletePrice = (i) => this.prices.splice(i, 1)

  onFocus = (e) => {
    this.priceTmp = null
  }

  constructor(
    private rest: RestService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router,
    public share: ShareService
  ) {
  }

  ngOnInit(): void {
    // this.valueInput.nativeElement.focus();
    // this.parseText()
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categories: ['', Validators.required],
      // deposit: ['', Validators.required],
      // provider: ['', Validators.required],
      sku: ['', Validators.required],
      tag: [''],
      gallery: [''],
      prices: [''],
      measures: ['']
    });
    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
      this.loadItem();
    });

    this.loadDeposits();
    this.loadProviders();

    // this.form.patchValue({content:'Ready!'})

  }

  loadItem = () => {
    this.rest.get(`products/${this.id}`).subscribe(res => {
      const {prices} = res;
      this.prices = prices;
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

  onSubmit(): void {
    const method = (this.id) ? 'patch' : 'post';
    this.form.patchValue({prices: this.prices})
    this.rest[method](`products${(method === 'patch') ? `/${this.id}` : ''}`, this.form.value)
      .subscribe(res => {
        this.cbList()
      })
  }

  parseData = (data: any) => {
    // const tmp = [];
    // data.docs.map(a => tmp.push()
    return data.docs;
  }

}
