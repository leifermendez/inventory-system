import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchasesRoutingModule } from './purchases-routing.module';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AvatarModule} from "ngx-avatar";
import {SwipeAngularListModule} from "swipe-angular-list";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [AddComponent, ListComponent],
  exports: [

  ],
  imports: [
    CommonModule,
    SwipeAngularListModule,
    PurchasesRoutingModule,
    SharedModule,
    FontAwesomeModule,
    AvatarModule,
    TranslateModule
  ]
})
export class PurchasesModule { }
