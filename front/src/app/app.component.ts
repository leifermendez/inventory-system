import {Component} from '@angular/core';
import {LoadingBarService} from "@ngx-loading-bar/core";
import {ShareService} from "./share.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front-inventory';
  progress: any = 0;

  constructor(public loader: LoadingBarService, public shared: ShareService) {
    this.loader.progress$.subscribe(res => {
      this.progress = res;
    })
  }


}
