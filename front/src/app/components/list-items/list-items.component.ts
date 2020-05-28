import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faPlus, faCalendarCheck, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit {
  @Input() title: string;
  @Input() mode: any = false;
  @Input() data: any = [];
  @Output() cbAdd = new EventEmitter<any>();
  faPlus = faPlus;
  faCalendarCheck = faCalendarCheck;
  faCalendarAlt = faCalendarAlt;

  constructor() {
  }

  ngOnInit(): void {

  }

  callbackAdd = (a: any = {}) => this.cbAdd.emit(a)

}
