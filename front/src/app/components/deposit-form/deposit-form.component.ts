import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../rest.service";


@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrls: ['./deposit-form.component.css']
})
export class DepositFormComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder,
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
  }

  onSubmit(): void {
    console.log(this.form.value)
    this.rest.post(`deposits`, this.form.value)
      .subscribe(res => {
        console.log(res)
      })
  }
}
