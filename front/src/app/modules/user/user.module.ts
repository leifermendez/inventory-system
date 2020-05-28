import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AddComponent } from './pages/add/add.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [AddComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ]
})
export class UserModule { }
