import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AvatarModule} from "ngx-avatar";
import {TranslateModule} from "@ngx-translate/core";
import {TimeagoModule} from "ngx-timeago";


@NgModule({
  declarations: [ListComponent],
    imports: [
        CommonModule,
        SearchRoutingModule,
        SharedModule,
        FontAwesomeModule,
        AvatarModule,
        TranslateModule,
        TimeagoModule
    ]
})
export class SearchModule { }
