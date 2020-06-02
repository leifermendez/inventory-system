import {Component, OnInit} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {Router} from "@angular/router";
import {ShareService} from "../../../../share.service";
import {faPhoneAlt, faUser, faLongArrowAltUp, faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
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
export class HomePageComponent implements OnInit {
  public inventory: any = []
  faPhoneAlt = faPhoneAlt;
  faUser = faUser;
  faLongArrowAltUp = faLongArrowAltUp;
  faLongArrowAltDown = faLongArrowAltDown;

  constructor(private rest: RestService,
              private router: Router,
              private share: ShareService) {

  }

  ngOnInit(): void {
    this.load('', 'inventory','inventory')
    // this.load('', 'inventory','inventory')
  }


  /**
   * Load
   * @param src
   * @param source
   * @param model
   */
  load = (src: string = '', source: string = '', model: string) => {
    const q = this.share.parseLoad(src, source, [
      `?fields=name`,
      `&limit=6`,
      `&sort=createdAt&order=-1`
    ]);

    this.rest.get(q.join(''))
      .subscribe(res => {
        this[model] = this.share.parseData(res, source);
      })
  }

}
