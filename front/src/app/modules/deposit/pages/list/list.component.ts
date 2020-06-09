import {Component, Input, OnInit} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {Router} from "@angular/router";
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
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
  public cbMode: any = null;
  public viewMore: any;
  public page: number = 1;
  constructor(private rest: RestService,
              private router: Router,
              private share: ShareService) {
  }
  @Input() limit: any = 8;
  faPhoneAlt = faPhoneAlt
  public data = [];
  public source = 'deposits';
  public history: any = [
    {
      name: 'Depositos'
    }
  ]

  ngOnInit(): void {
    this.load()
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
        this.data = this.share.parseData(res, this.source);
      },error => {
        (error.status === 401) ? this.cbMode = 'blocked' : null
      })
  }

  goTo = () => this.share.goTo(this.source)

  onSrc = (e) => this.load(e)


  paginate = () => {
    this.page = this.page+1;
    this.load();
  }
}
