import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {SideBarComponent} from "../../components/side-bar/side-bar.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {TabsModule} from 'ngx-bootstrap/tabs';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ListItemsComponent} from "../../components/list-items/list-items.component";
import {DetailInvoiceComponent} from "../../components/detail-invoice/detail-invoice.component";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    ListItemsComponent,
    DetailInvoiceComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule
  ],
  exports: [HeaderComponent, SideBarComponent, ListItemsComponent, DetailInvoiceComponent]
})
export class SharedModule {
}
