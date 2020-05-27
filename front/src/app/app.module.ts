import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BsDatepickerConfig, BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import {HttpClient} from "@angular/common/http";
import { Page404Component } from './components/page404/page404.component';
import { ProductFormComponent } from './components/product-form/product-form.component';


export function getDatepickerConfig(): BsDatepickerConfig {
  return Object.assign(new BsDatepickerConfig(), {
    dateInputFormat: 'YYYY-MMM-DD',
    isAnimated: true,
  });
}

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      defaultLanguage: 'es'
    }),
    LottieModule.forRoot({player: playerFactory}),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [{provide: BsDatepickerConfig, useFactory: getDatepickerConfig}],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
