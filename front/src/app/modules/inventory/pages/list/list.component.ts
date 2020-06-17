import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {Router} from "@angular/router";
import {faPhoneAlt, faUser, faLongArrowAltUp, faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {ShareService} from "../../../../share.service";

@Component({
  selector: 'app-list-inventory',
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
  public page: number = 1;

  constructor(private rest: RestService,
              private router: Router,
              private share: ShareService) {
  }

  faPhoneAlt = faPhoneAlt
  faLongArrowAltUp = faLongArrowAltUp
  faLongArrowAltDown = faLongArrowAltDown
  faUser = faUser
  public data = [];
  public cbMode: any = false;
  public viewMore: any;
  public source = 'inventory';
  public history: any = [
    {
      name: 'Inventario / Movimientos'
    }
  ]

  ngOnInit(): void {
    this.load()
  }

  load = (src: string = '') => {
    let fields = [
      `?fields=name`,
      `&sort=createdAt&order=-1`,
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

  onSrc = (e) => this.load(e)

  paginate = () => {
    this.page = this.page + 1;
    this.load();
  }

  goToDetail(data = null) {
    if (data && data.purchase) {
      this.router.navigate(['/', 'purchase', data.purchase])
    }
  }
}
