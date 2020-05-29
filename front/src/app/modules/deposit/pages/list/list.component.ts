import {Component, OnInit} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {Router} from "@angular/router";
import {faPhoneAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private rest: RestService,
              private router: Router) {
  }

  faPhoneAlt = faPhoneAlt
  public data = [];

  public history: any = [
    {
      name: 'Depositos'
    }
  ]

  ngOnInit(): void {
    this.load()
  }

  load = () => {
    this.rest.get(`deposits`)
      .subscribe(res => {
        this.data = this.parseData(res);
      })
  }

  goTo = () => {
    this.router.navigate(['/', 'deposits', 'add'])
  }

  parseData = (data: any) => {
    const tmp = [];
    data.docs.map(a => tmp.push({
      ...a, ...{
        router: ['/', 'deposits', a._id]
      }
    }));
    return tmp;
  }
}