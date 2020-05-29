import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";
import {ShareService} from "../../share.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() mode: string = 'list'
  public form: FormGroup;
  public roles: any = [
    {
      name: 'Administrador',
      value: 'admin'
    },
    {
      name: 'Encargado',
      value: 'manager'
    },
    {
      name: 'Cliente',
      value: 'customer'
    }
  ]
  public id: any = null;
  public data: any = []

  constructor(private formBuilder: FormBuilder,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private shared: ShareService,
              public router: Router,
              private rest: RestService) {
  }

  ngOnInit(): void {
    const password = this.shared.generate(10)
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      nie: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      tag: [''],
      description: [''],
    });

    this.route.params.subscribe(params => {
      this.id = (params.id === 'add') ? '' : params.id;
    });

    this.loadProvider()
    this.form.patchValue({password})
  }

  onSubmit(): void {
    console.log(this.mode)
    const method = (this.id) ? 'patch' : 'post';
    this.rest[method](`users${(method === 'patch') ? `/${this.id}` : ''}`, this.form.value)
      .subscribe(res => {
        if (this.mode === 'list') {
          this.cbList();
        }
        this.shared.registerUser.emit(res)
      })
  }

  cbList = () => {
    this.router.navigate(['/', 'users'])
  }

  loadProvider = () => {
    this.rest.get(`users/${this.id}`)
      .subscribe(res => {
        console.log(res)
        this.form.patchValue(res)
        // this.data = this.parseData(res);
      })
  }

}
