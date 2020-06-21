import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {Router} from "@angular/router";
import {faPhoneAlt, faIndustry, faUser} from '@fortawesome/free-solid-svg-icons';
import {ShareService} from "../../../../share.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-list-products',
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
  @Output() cbClick = new EventEmitter<any>();
  public cbMode: any = null;
  public currency: any = null;
  public currencySymbol: any = null;

  constructor(private rest: RestService,
              private share: ShareService,
              private router: Router) {
  }

  faPhoneAlt = faPhoneAlt
  faIndustry = faIndustry
  faUser = faUser
  public page: number = 1;
  public data = [];
  public source = 'products';
  public viewMore: any;

  public history: any = [
    {
      name: 'Productos'
    }
  ]

  ngOnInit(): void {
    const {currency, currencySymbol} = this.share.getSettings();
    this.currencySymbol = currencySymbol;
    this.currency = currency
    this.load()
  }

  emitCbClick = (inside: any = {}) => {
    if (this.mode === 'modal') {
      this.cbClick.emit(inside);
    } else {
      this.router.navigate(['/', 'products', inside?._id])
    }

  }


  load = (src: string = '') => {
    let fields = [
      `?fields=name`,
      `&page=${this.page}`
    ];
    fields.push(`&limit=${this.limit}`)
    const q = this.share.parseLoad(src, this.source, fields);
    this.rest.get(q.join(''))
      .subscribe(res => {
        this.viewMore = this.share.nextPage(res);
        this.data = (!src.length) ?
          [...this.data, ...this.share.parseData(res, this.source)] :
          [...this.share.parseData(res, this.source)];
      }, error => {
        (error.status === 401) ? this.cbMode = 'blocked' : null
      })
  }

  goTo = () => this.share.goTo(this.source)

  onSrc = (e) => this.load(e);

  paginate = () => {
    this.page = this.page + 1;
    this.load();
  }

}
