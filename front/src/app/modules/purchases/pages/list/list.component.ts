import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {Router} from "@angular/router";
import {faPhoneAlt, faIndustry, faUser} from '@fortawesome/free-solid-svg-icons';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {ShareService} from "../../../../share.service";

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
  @Input() mode: string = 'page'
  @Input() title: any = false;
  @Input() limit: any = 8;
  public cbMode: any = false;

  constructor(private rest: RestService,
              private router: Router,
              private share: ShareService) {
  }

  faIndustry = faIndustry
  faPhoneAlt = faPhoneAlt
  faUser = faUser
  public data = [];
  public source = 'purchase';
  public currency = null;
  public currencySymbol = null;
  public history: any = [
    {
      name: 'Pedidos'
    }
  ]

  ngOnInit(): void {
    const {currency, currencySymbol} = this.share.getSettings();
    this.currency = currency;
    this.currencySymbol = currencySymbol
    this.load()
  }

  load = (src: string = '') => {
    let fields = [
      `?fields=name`,
      `&sort=createdAt&order=-1`
    ];
    if (this.mode === 'home') {
      fields.push(`&limit=${this.limit}`)
    }
    const q = this.share.parseLoad(src, this.source, fields);
    this.rest.get(q.join(''))
      .subscribe(res => {
        this.data = this.share.parseData(res, this.source);
      }, error => {
        (error.status === 401) ? this.cbMode = 'blocked' : null
      })
  }

  goTo = () => this.share.goTo(this.source)

  onSrc = (e) => this.load(e)

}
