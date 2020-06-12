import {Component, OnInit} from '@angular/core';
import {
  faPhoneAlt
} from '@fortawesome/free-solid-svg-icons';
import {RestService} from "../../../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ShareService} from "../../../../share.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any = []
  faPhoneAlt = faPhoneAlt;
  public source = 'search';
  public cbMode: any = false;

  constructor(private rest: RestService,
              private router: Router,
              private route: ActivatedRoute,
              private share: ShareService) {
  }

  ngOnInit(): void {
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

}
