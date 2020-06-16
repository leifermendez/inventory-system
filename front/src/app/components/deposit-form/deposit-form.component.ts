import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";
import {ModalUserComponent} from "../modal-user/modal-user.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../share.service";


@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.css']
})
export class DepositFormComponent implements OnInit {
  public form: FormGroup;
  public data: any = []
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
      name: ['', Validators.required],
      manager: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      tag: [''],
      description: [''],
    });
    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
    });

    this.shared.registerUser.subscribe(res => {
      this.form.patchValue({manager: res})
      this.users = [...[res],
        ...this.users];
    })

    this.loadProvider()
  }

  onSubmit(): void {
    const method = (this.id) ? 'patch' : 'post';
    this.rest[method](`deposits${(method === 'patch') ? `/${this.id}` : ''}`, this.form.value)
      .subscribe(res => {
        this.cbList()
      })
  }

  loadProvider = () => {
    if (this.id && (this.id.length)) {
      this.rest.get(`deposits/${this.id}`)
        .subscribe(res => {
          console.log(res)
          this.form.patchValue(res)
          // this.data = this.parseData(res);
        })
    }
  }

  selectUser = (e) => {
    if (e.value === 'new') {
      this.form.patchValue({manager: null})
      this.open({role: 'customer'})
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
        router: ['/', 'deposits', a._id]
      }
    }));
    return tmp;
  }

  cbList = () => {
    this.router.navigate(['/', 'deposits'])
  }

  cbTrash = () => {
    this.rest.delete(`deposits/${this.id}`)
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

  src = (e) => {
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
        this.users = [...[{
          _id: 0,
          name: 'New User',
          value: 'new'
        }],
          ...this.parseData(res)];
      })
  }
}
