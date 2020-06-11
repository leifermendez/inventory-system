import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddOnsRoutingModule } from './add-ons-routing.module';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import {LottieModule} from "ngx-lottie";


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    AddOnsRoutingModule,
    SharedModule,
    LottieModule
  ]
})
export class AddOnsModule { }
