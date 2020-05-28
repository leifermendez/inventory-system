import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { AddComponent } from './pages/add/add.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    DepositRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DepositModule { }
