import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { AddComponent } from './pages/add/add.component';
import {SharedModule} from "../shared/shared.module";
import { ListComponent } from './pages/list/list.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AvatarModule} from "ngx-avatar";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
    declarations: [AddComponent, ListComponent],
    exports: [
        ListComponent
    ],
  imports: [
    CommonModule,
    ProvidersRoutingModule,
    SharedModule,
    FontAwesomeModule,
    AvatarModule,
    TranslateModule
  ]
})
export class ProvidersModule { }
