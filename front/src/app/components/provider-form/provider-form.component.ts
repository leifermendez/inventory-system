import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShareService} from "../../share.service";
import {RestService} from "../../rest.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
  public form: FormGroup;
  public data: any = []

  constructor(private formBuilder: FormBuilder,
              public share: ShareService,
              public router: Router,
              private rest: RestService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      manager: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      trace: [''],
      description: [''],
      tag: ['']
    });

    this.loadUser()
  }

  loadUser = () => {
    const q = [
      'users?',
      'filter=manager&',
      'fields=role&',
      'limit=10000&',
      'sort=name&order=-1',
    ];
    this.rest.get(q.join(''))
      .subscribe(res => {
        this.data = this.parseData(res);
      })
  }

  parseData = (data: any) => {
    // const tmp = [];
    // data.docs.map(a => tmp.push()
    return data.docs;
  }

  onSubmit(): void {

    this.rest.post(`providers`, this.form.value)
      .subscribe(res => {
        this.cbList()
      })
  }

  cbList = () => {
    this.router.navigate(['/', 'providers'])
  }


}
