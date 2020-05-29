import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { AddComponent } from './pages/add/add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import { ListComponent } from './pages/list/list.component';
import {AvatarModule} from "ngx-avatar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    DepositRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    AvatarModule,
    FontAwesomeModule
  ]
})
export class DepositModule { }
