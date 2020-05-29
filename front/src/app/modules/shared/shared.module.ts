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
import {TagInputModule} from "ngx-chips";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxCurrencyModule} from "ngx-currency";
import {ModalModule} from 'ngx-bootstrap/modal';
import {RouterModule} from "@angular/router";
import {ProviderFormComponent} from "../../components/provider-form/provider-form.component";
import {DepositFormComponent} from "../../components/deposit-form/deposit-form.component";
import {SectionBtnComponent} from "../../components/section-btn/section-btn.component";
import {UserFormComponent} from "../../components/user-form/user-form.component";
import {AvatarModule} from "ngx-avatar";
import {ModalUserComponent} from "../../components/modal-user/modal-user.component";

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
    ProductFormComponent,
    ProviderFormComponent,
    DepositFormComponent,
    SectionBtnComponent,
    UserFormComponent,
    ListItemsComponent,
    ModalUserComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxCurrencyModule,
    BsDropdownModule,
    BsDatepickerModule,
    AvatarModule,
    LottieModule,
    NgSelectModule,
    FormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    TranslateModule,
    TagInputModule,
    RouterModule,
  ],
  exports: [HeaderComponent, SideBarComponent, WorkingBoxComponent,
    ListItemsComponent, DetailInvoiceComponent, BoxEmptyComponent,
    LockedBoxComponent, ProductFormComponent,
    ProviderFormComponent, DepositFormComponent,
    SectionBtnComponent,
    UserFormComponent, ListItemsComponent, ModalUserComponent]
})
export class SharedModule {
}