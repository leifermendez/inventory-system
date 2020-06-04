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
import {HttpClient, HttpClientModule} from "@angular/common/http";
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
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LoadingBarModule,
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
        FontAwesomeModule
    ],
  providers: [{provide: BsDatepickerConfig, useFactory: getDatepickerConfig}, CookieService],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
