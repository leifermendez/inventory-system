import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Schema} from "prosemirror-model";
import {schema} from "ngx-editor";
import {
  faCheck
}
  from '@fortawesome/free-solid-svg-icons';
import {CurrencyMaskInputMode} from "ngx-currency";

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

  priceTmp = 0;

  faCheck = faCheck
  editorContent: object = {
    type: 'doc',
    content: []
  };
  itemsAsObjects = [];
  cities = [
    {id: 1, name: 'Vilnius'},
    {id: 2, name: 'Kaunas'},
    {id: 3, name: 'Pavilnys', disabled: true},
    {id: 4, name: 'Pabradė'},
    {id: 5, name: 'Klaipėda'}
  ];
  selectedCity: any;

  public ngxCurrencyOptions = {
    prefix: 'R$ ',
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
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // this.valueInput.nativeElement.focus();
    // this.parseText()
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      content: ['', Validators.required],
      categories: ['', Validators.required],
      provider: ['', Validators.required],
      sku: ['', Validators.required],
      tag: [''],
      gallery: [''],
      description: [''],
    });
    // this.form.patchValue({content:'Ready!'})

  }

  parseText = () => {
    // const contentNode = schema.nodeFromJSON(jsonDoc);
    this.editorContent = new Schema({
      nodes: {
        text: {},
        doc: {content: "text*"}
      }
    })
  }
}
