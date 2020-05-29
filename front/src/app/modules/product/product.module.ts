import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {DetailComponent} from './pages/detail/detail.component';
import {SharedModule} from "../shared/shared.module";
import { ListComponent } from './pages/list/list.component';
import {AvatarModule} from "ngx-avatar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [DetailComponent, ListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    AvatarModule,
    FontAwesomeModule
  ]
})
export class ProductModule {
}
