import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OauthRoutingModule} from './oauth-routing.module';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import {SharedModule} from "../shared/shared.module";
import {LottieModule} from "ngx-lottie";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LoadingBtnDirective} from "../../loading-btn.directive";


@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoadingBtnDirective],
  imports: [
    CommonModule,
    OauthRoutingModule,
    SharedModule,
    LottieModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class OauthModule {
}
