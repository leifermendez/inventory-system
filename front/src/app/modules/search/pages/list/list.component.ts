import {Component, OnInit} from '@angular/core';
import {
  faAngleRight,
  faBox,
  faCartPlus,
  faCashRegister,
  faChartPie,
  faClipboardList,
  faCrown,
  faIndustry,
  faUser,
  faUsers,
  faPlug,
  faPhoneAlt,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons';
import {RestService} from "../../../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../../../share.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({opacity: 0}),
          stagger(30, [
            animate(100, style({opacity: 1}))
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class ListComponent implements OnInit {
  data: any = []
  faPhoneAlt = faPhoneAlt;
  faIndustry = faIndustry;
  faCartPlus = faCartPlus;
  faWarehouse = faWarehouse;
  faUser = faUser;
  faUsers = faUsers;
  faBox = faBox;
  public source = 'search';
  public cbMode: any = false;
  public currency = null;
  public currencySymbol = null;

  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute,
              private share: ShareService) {
  }

  ngOnInit(): void {
    const {currency, currencySymbol} = this.share.getSettings();
    this.currency = currency;
    this.currencySymbol = currencySymbol
    this.countDocs();
    this.route.queryParams.subscribe(
      params => {

        const {q} = params
        if (q) {
          this.load(q)
        }
      });
  }

  load = (src: string = '') => {
    let fields = [
      `?fields=name,lastName,controlNumber`,
      `&limit=5`
    ];

    const q = this.share.parseLoad(src, this.source, fields);
    this.rest.get(q.join(''))
      .subscribe(res => {
        this.data = {...this.data, ...res}
      }, error => {
        (error.status === 401) ? this.cbMode = 'blocked' : null
      })
  }

  countDocs = () => {
      this.data.map(a => console.log(a.docs))
  }

}
