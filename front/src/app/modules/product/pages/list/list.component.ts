import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {Router} from "@angular/router";
import {faPhoneAlt, faIndustry, faUser} from '@fortawesome/free-solid-svg-icons';
import {ShareService} from "../../../../share.service";

@Component({
  selector: 'app-list-products',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @Input() mode: string = 'page'
  @Input() title: any = false;
  @Input() limit: any = 8;
  @Output() cbClick = new EventEmitter<any>();

  constructor(private rest: RestService,
              private share: ShareService,
              private router: Router) {
  }

  faPhoneAlt = faPhoneAlt
  faIndustry = faIndustry
  faUser = faUser
  public data = [];
  public source = 'products';

  public history: any = [
    {
      name: 'Productos'
    }
  ]

  ngOnInit(): void {
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
      `?fields=name`
    ];
    if (this.mode === 'home') {
      fields.push(`&limit=${this.limit}`)
    }
    const q = this.share.parseLoad(src, this.source, fields);
    this.rest.get(q.join(''))
      .subscribe(res => {
        this.data = this.share.parseData(res, this.source);
      })
  }

  goTo = () => this.share.goTo(this.source)

  onSrc = (e) => this.load(e)
}
