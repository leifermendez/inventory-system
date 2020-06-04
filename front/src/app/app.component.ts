import {Component} from '@angular/core';
import {LoadingBarService} from "@ngx-loading-bar/core";
import {ShareService} from "./share.service";
import {RestService} from "./rest.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front-inventory';
  progress: any = 0;
  error: any = null;

  constructor(public loader: LoadingBarService, public shared: ShareService,
              public rest: RestService) {
    this.loader.progress$.subscribe(res => {
      this.progress = res;
    })

    this.rest.catchError.subscribe(res => {
      this.error = res;
    })
  }


}
