import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './pages/add/add.component';
import {SharedModule} from "../shared/shared.module";
import { ListComponent } from './pages/list/list.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AvatarModule} from "ngx-avatar";
import {TimeagoModule} from "ngx-timeago";


@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FontAwesomeModule,
    AvatarModule,
    TimeagoModule
  ]
})
export class UserModule { }
