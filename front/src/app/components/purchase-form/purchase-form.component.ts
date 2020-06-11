import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShareService} from "../../share.service";
import {RestService} from "../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalUserComponent} from "../modal-user/modal-user.component";

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

  public form: FormGroup;
  public data: any = []
  public users: any = []
  public products: any = []
  public deliveryType: any = []
  public status: any = []
  public id: any = null
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

    this.deliveryType = [
      {
        name: 'Envio a dirección',
        value: 'to_send'
      },
      {
        name: 'Retirar en tienda',
        value: 'in_house'
      }
    ];


    this.status = [
      {
        name: 'Pagado',
        value: 'paid'
      },
      {
        name: 'En espera',
        value: 'hold'
      },
      {
        name: 'Procesando',
        value: 'process'
      },
      {
        name: 'Otro',
        value: 'exceptional'
      }
    ];

    this.form = this.formBuilder.group({
      customer: ['', Validators.required],
      items: [''],
      deliveryAddress: ['', Validators.required],
      deliveryType: ['', Validators.required],
      status: [''],
      description: [''],
      total: [''],
      tag: ['']
    });

    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
    });

    this.shared.registerUser.subscribe(res => {
      this.users = [...[res],
        ...this.users];
    })

    this.loadProvider()
    this.loadUser()
  }

  loadProvider = () => {
    if (this.id && (this.id.length)) {
      this.rest.get(`purchase/${this.id}`)
        .subscribe(res => {
          console.log(res)
          this.form.patchValue(res)
          // this.data = this.parseData(res);
        })
    }

  }

  loadUser = () => {
    this.rest.get(`users?filter=customer&fields=role&limit=10000&sort=name&order=-1`)
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
    // const tmp = [];
    // data.docs.map(a => tmp.push()
    return data.docs;
  }

  selectUser = (e) => {
    if (e.value === 'new') {
      this.form.patchValue({manager: null})
      this.open()
    }
  }

  selectCustomer = (e) => {
    if (e.value === 'new') {
      this.form.patchValue({manager: null})
      this.open()
    }
  }

  srcCustomer = (e) => {
    const {term} = e;
    const q = [
      `users?`,
      `filter=${term}`,
      `&fields=name,email`,
      `&page=1&limit=5`,
      `&sort=name&order=-1`,
    ];

    this.rest.get(q.join(''))
      .subscribe(res => {
        this.products = [...this.parseData(res), {id: 1, name: 'New item'}];
      })
  }


  onSubmit(): void {
    const method = (this.id) ? 'patch' : 'post';
    this.rest[method](`purchase${(method === 'patch') ? `/${this.id}` : ''}`, this.form.value)
      .subscribe(res => {
       this.router.navigate(['/','purchase',res._id])
      })
  }

  cbList = () => {
    this.router.navigate(['/', 'purchase'])
  }

  cbTrash = () => {
    this.rest.delete(`purchase/${this.id}`)
      .subscribe(res => this.cbList())
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


}
