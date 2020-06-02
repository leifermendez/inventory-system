import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Schema} from "prosemirror-model";
import {faLifeRing, faSave, faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {schema} from "ngx-editor";

import {CurrencyMaskInputMode} from "ngx-currency";
import {RestService} from "../../rest.service";
import {Router} from "@angular/router";

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
  public deposits = [];
  public providers = [];

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

  onFocus = (e) => {
    this.priceTmp = null
  }

  constructor(
    private rest: RestService,
    private formBuilder: FormBuilder,
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    // this.valueInput.nativeElement.focus();
    // this.parseText()
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      categories: ['', Validators.required],
      deposit: ['', Validators.required],
      provider: ['', Validators.required],
      sku: ['', Validators.required],
      tag: [''],
      gallery: [''],
      prices: [''],
      measures: [''],
      description: [''],
    });
    this.loadDeposits();
    this.loadProviders();
    // this.form.patchValue({content:'Ready!'})

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
