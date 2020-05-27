import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ListItemsComponent} from './components/list-items/list-items.component';
import {DetailInvoiceComponent} from './components/detail-invoice/detail-invoice.component';
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { BoxEmptyComponent } from './components/box-empty/box-empty.component';

export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'YYYY-MMM-DD',
    isAnimated: true,
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [{provide: BsDatepickerConfig, useFactory: getDatepickerConfig}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
