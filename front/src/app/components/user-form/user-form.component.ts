import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";
import {ShareService} from "../../share.service";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
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

  constructor(private formBuilder: FormBuilder,
              private shared: ShareService,
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

    this.form.patchValue({password})
  }

  onSubmit(): void {

    this.rest.post(`users`, this.form.value)
      .subscribe(res => {
        this.shared.registerUser.emit(res)
      })
  }


}
