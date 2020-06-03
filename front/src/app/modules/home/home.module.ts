import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import {SharedModule} from "../shared/shared.module";
import {AvatarModule} from "ngx-avatar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TimeagoModule} from "ngx-timeago";
import {TranslateModule} from "@ngx-translate/core";
import {InventoryModule} from "../inventory/inventory.module";
import {ProvidersModule} from "../providers/providers.module";
import {ProductModule} from "../product/product.module";


@NgModule({
  declarations: [HomePageComponent],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        AvatarModule,
        FontAwesomeModule,
        TooltipModule,
        TimeagoModule,
        TranslateModule,
        InventoryModule,
        ProvidersModule,
        ProductModule
    ]
})
export class HomeModule { }
