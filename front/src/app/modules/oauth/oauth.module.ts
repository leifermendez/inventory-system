import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import {SharedModule} from "../shared/shared.module";
import {LottieModule} from "ngx-lottie";


@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    OauthRoutingModule,
    SharedModule,
    LottieModule
  ]
})
export class OauthModule { }
