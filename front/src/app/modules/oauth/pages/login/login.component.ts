import {Component, OnInit} from '@angular/core';
import {AnimationItem} from "lottie-web";
import {AnimationOptions} from "ngx-lottie";
import {RestService} from "../../../../rest.service";
import {AuthService} from "../../../../auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/images/play.json',
  };
  public form: FormGroup;

  constructor(private rest: RestService,
              private router: Router,
              private auth: AuthService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.auth.checkSession(true, true)
      .then(a => this.router.navigate(['/']));
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  onSubmit = () => {
    console.log(this.form.value)
    this.auth.login(this.form.value).then(res => {
      this.router.navigate(['/']).then();
    });
  };

}
