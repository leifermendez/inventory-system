import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShareService} from "../../share.service";
import {RestService} from "../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalUserComponent} from "../modal-user/modal-user.component";

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  public form: FormGroup;
  public data: any = []
  public users: any = []
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
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      manager: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      trace: [''],
      description: [''],
      tag: ['']
    });

    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
    });

    this.shared.registerUser.subscribe(res => {
      this.users = [...[res],
        ...this.users];

      this.form.patchValue({manager: res})
    })

    this.loadProvider()

  }

  loadProvider = () => {
    if (this.id && (this.id.length)) {
      this.rest.get(`providers/${this.id}`)
        .subscribe(res => {
          console.log(res)
          this.form.patchValue(res)
          // this.data = this.parseData(res);
        })
    }
  }

  loadUser = () => {

  }

  parseData = (data: any) => {
    // const tmp = [];
    // data.docs.map(a => tmp.push()
    return data.docs;
  }
  selectUser = (e) => {
    if (e && e.value === 'new') {
      this.form.patchValue({manager: null})
      this.open({
        role: 'customer'
      })
    }
  }


  onSubmit(): void {
    const method = (this.id) ? 'patch' : 'post';
    this.rest[method](`providers${(method === 'patch') ? `/${this.id}` : ''}`, this.form.value)
      .subscribe(res => {
        this.cbList()
      })
  }

  cbList = () => {
    this.router.navigate(['/', 'providers'])
  }

  cbTrash = () => {
    this.rest.delete(`providers/${this.id}`)
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
