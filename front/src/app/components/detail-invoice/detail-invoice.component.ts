import {Component, OnInit, ViewChild} from '@angular/core';
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {
  faTruck, faFileAlt, faBox, faFolderOpen, faCrown, faChartPie, faUsers, faAngleRight,
  faCashRegister
}
  from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css']
})
export class DetailInvoiceComponent implements OnInit {
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;
  faFileAlt = faFileAlt;

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
