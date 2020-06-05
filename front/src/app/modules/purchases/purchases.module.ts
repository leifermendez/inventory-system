import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AvatarModule} from "ngx-avatar";


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    PurchasesRoutingModule,
    SharedModule,
    FontAwesomeModule,
    AvatarModule
  ]
})
export class PurchasesModule { }
