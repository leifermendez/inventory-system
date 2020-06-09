import {Component, OnInit} from '@angular/core';
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
  public cbMode: any = null;

  constructor(private rest: RestService,
              private router: Router,
              private share: ShareService) {
  }

  faPhoneAlt = faPhoneAlt
  faIndustry = faIndustry
  faUser = faUser
  public data = [];
  public source: string = 'users'

  public history: any = [
    {
      name: 'Usuarios'
    }
  ]

  ngOnInit(): void {
    this.load()
  }

  load = (src: string = '') => {
    const q = this.share.parseLoad(src, this.source);
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
