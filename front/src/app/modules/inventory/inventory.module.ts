import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import {AvatarModule} from "ngx-avatar";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TimeagoModule} from "ngx-timeago";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TranslateModule} from "@ngx-translate/core";
import {ProductModule} from "../product/product.module";


@NgModule({
    declarations: [AddComponent, ListComponent],
    exports: [
        ListComponent
    ],
    imports: [
        CommonModule,
        InventoryRoutingModule,
        SharedModule,
        AvatarModule,
        FontAwesomeModule,
        TimeagoModule,
        TooltipModule,
        TranslateModule,
        ProductModule
    ]
})
export class InventoryModule { }
