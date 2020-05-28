import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {DetailComponent} from './pages/detail/detail.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule {
}
