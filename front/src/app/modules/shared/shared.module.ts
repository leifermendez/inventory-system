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
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {BoxEmptyComponent} from "../../components/box-empty/box-empty.component";
import {WorkingBoxComponent} from "../../components/working-box/working-box.component";
import {LottieModule} from "ngx-lottie";
import {LockedBoxComponent} from "../../components/locked-box/locked-box.component";
import {ProductFormComponent} from "../../components/product-form/product-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxEditorModule} from "ngx-editor";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideBarComponent,
    ListItemsComponent,
    DetailInvoiceComponent,
    BoxEmptyComponent,
    WorkingBoxComponent,
    LockedBoxComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule,
    BsDatepickerModule,
    LottieModule,
    FormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [HeaderComponent, SideBarComponent, WorkingBoxComponent,
    ListItemsComponent, DetailInvoiceComponent, BoxEmptyComponent,
    LockedBoxComponent, ProductFormComponent]
})
export class SharedModule {
}
