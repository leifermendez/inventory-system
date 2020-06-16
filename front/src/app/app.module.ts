import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {Page404Component} from './components/page404/page404.component';
import {TagInputModule} from "ngx-chips";
import {CookieService} from "ngx-cookie-service";
import {ListGeneralComponent} from './components/list-general/list-general.component';
import {SharedModule} from "./modules/shared/shared.module";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoadingSvgComponent } from './components/loading-svg/loading-svg.component';
import { FirstImagePipe } from './first-image.pipe';
import { ErrorLayerComponent } from './components/error-layer/error-layer.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { ModalImageComponent } from './components/modal-image/modal-image.component';
import {DEFAULT_TIMEOUT, TimeoutInterceptor} from "./TimeOutInterceptor";
import { ButtonProgressComponent } from './components/button-progress/button-progress.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';
import { ModalProductComponent } from './components/modal-product/modal-product.component';
import {ProductModule} from "./modules/product/product.module";
import {AvatarModule} from "ngx-avatar";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CopilotComponent } from './components/copilot/copilot.component';
import {DeviceDetectorModule} from "ngx-device-detector";
import { ModalUpdateComponent } from './components/modal-update/modal-update.component';
import { ListAddonsComponent } from './components/list-addons/list-addons.component';
import { CountSearchDataPipe } from './count-search-data.pipe';
import { ModalProfileComponent } from './components/modal-profile/modal-profile.component';
import { ModalWizardComponent } from './components/modal-wizard/modal-wizard.component';
import {FilePickerModule} from "ngx-awesome-uploader";
import { ModalViewAddComponent } from './components/modal-view-add/modal-view-add.component';


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'YYYY-MMM-DD',
    isAnimated: true,
  });
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    ListGeneralComponent,
    LoadingSvgComponent,
    ErrorLayerComponent,
    ModalImageComponent,
    ButtonProgressComponent,
    ModalProductComponent,
    CopilotComponent,
    ModalUpdateComponent,
    ModalProfileComponent,
    ModalWizardComponent,
    ModalViewAddComponent,
     ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoadingBarModule,
    DeviceDetectorModule.forRoot(),
    LoadingBarHttpClientModule,
    TagInputModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LottieModule.forRoot({player: playerFactory}),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SharedModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ProductModule,
    AvatarModule,
    TooltipModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    FilePickerModule
  ],
  providers: [
    {provide: BsDatepickerConfig, useFactory: getDatepickerConfig},
    CookieService,
    [{ provide: HTTP_INTERCEPTORS, useClass: TimeoutInterceptor, multi: true }],
    [{ provide: DEFAULT_TIMEOUT, useValue: 30000 }]
  ],
  exports: [


  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
