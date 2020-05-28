import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvidersRoutingModule } from './providers-routing.module';
import { AddComponent } from './pages/add/add.component';
import {SharedModule} from "../shared/shared.module";
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [AddComponent, ListComponent],
    imports: [
        CommonModule,
        ProvidersRoutingModule,
        SharedModule
    ]
})
export class ProvidersModule { }
