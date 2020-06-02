import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../share.service";
import {RestService} from "../../rest.service";
import {ModalUserComponent} from "../modal-user/modal-user.component";

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css']
})
export class InventoryFormComponent implements OnInit {

  public form: FormGroup;
  public data: any = []
  public providers: any = []
  public products: any = []
  public deposits: any = []
  public users: any = []
  public id: any = null;
  itemsAsObjects = [];
  bsModalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private shared: ShareService,
              public router: Router,
              private rest: RestService) {
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      product: ['', Validators.required],
      provider: ['', Validators.required],
      qty: ['', Validators.required],
      priceBase: [''],
      deposit: ['', Validators.required],
      tag: [''],
      description: [''],
    });

    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
    });

    this.shared.registerUser.subscribe(res => {
      this.users = [...[res],
        ...this.users];
    })

    // this.loadProducts()
    this.loadProviders()
    this.loadDeposits()
    this.loadUser()
  }

  onSubmit(): void {
    const method = (this.id) ? 'patch' : 'post';
    this.rest[method](`inventory${(method === 'patch') ? `/${this.id}` : ''}`, this.form.value)
      .subscribe(res => {
        this.cbList()
      })
  }

  loadProviders = () => {
    this.rest.get(`providers?filter&limit=10000&sort=name&order=-1`)
      .subscribe(res => {
        this.providers = [...[{
          _id: 0,
          name: 'New User',
          value: 'new'
        }],
          ...this.parseData(res)];
      })
  }

  loadProducts = () => {
    this.rest.get(`products?filter&limit=10000&sort=name&order=-1`)
      .subscribe(res => {
        this.products = [...[{
          _id: 0,
          name: 'New User',
          value: 'new'
        }],
          ...this.parseData(res)];
      })
  }

  loadDeposits = () => {
    this.rest.get(`deposits?filter&limit=10000&sort=name&order=-1`)
      .subscribe(res => {
        this.deposits = [...[{
          _id: 0,
          name: 'New User',
          value: 'new'
        }],
          ...this.parseData(res)];
      })
  }

  selectProduct = (e) => {
    console.log(e)
    // if (e.value === 'new') {
    //   this.form.patchValue({manager: null})
    //   this.open()
    // }
  }

  selectUser = (e) => {
    if (e.value === 'new') {
      this.form.patchValue({manager: null})
      this.open()
    }
  }


  loadUser = () => {
    this.rest.get(`users?filter=manager&fields=role&limit=10000&sort=name&order=-1`)
      .subscribe(res => {
        this.users = [...[{
          _id: 0,
          name: 'New User',
          value: 'new'
        }],
          ...this.parseData(res)];
      })
  }

  parseData = (data: any) => {
    const tmp = [];
    data.docs.map(a => tmp.push({
      ...a, ...{
        router: ['/', 'inventory', a._id]
      }
    }));
    return tmp;
  }

  cbList = () => {
    this.router.navigate(['/', 'inventory'])
  }

  open(data: any = null) {
    const initialState = {
      section: data
    };

    this.bsModalRef = this.modalService.show(
      ModalUserComponent,
      Object.assign({initialState}, {
        class: 'modal-light-plan',
        ignoreBackdropClick: false
      })
    );
  }

  srcProduct = (e) => {
    const {term} = e;
    const q = [
      `products?`,
      `filter=${term}`,
      `&fields=name,description`,
      `&page=1&limit=5`,
      `&sort=name&order=-1`,
    ];

    this.rest.get(q.join(''))
      .subscribe(res => {
        this.products = [...this.parseData(res), {id: 1, name: 'New item'}];
      })

    console.log(this.products)
  }

}
