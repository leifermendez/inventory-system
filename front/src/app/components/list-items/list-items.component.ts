import {Component, Input, OnInit} from '@angular/core';
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
  faPlus = faPlus;
  faCalendarCheck = faCalendarCheck;
  faCalendarAlt = faCalendarAlt;

  constructor() {
  }

  ngOnInit(): void {
    this.data = [
      {
        name: 'Panaderia Juarez',
        id: 1,
        status: 'paid',
        delivery: 'today'
      },
      {
        name: 'Panaderia Juarez',
        id: 1,
        status: 'paid',
        delivery: 'today'
      },
      {
        name: 'Panaderia Juarez',
        id: 1,
        status: 'paid',
        delivery: 'tomorrow'
      },
      {
        name: 'Tu Torta',
        id: 2,
        status: 'hold',
        delivery: 'today'
      },
      {
        name: 'Cakes Pretty',
        id: 3,
        status: 'process',
        delivery: 'today'
      },
      {
        name: 'Cakes Pretty',
        id: 3,
        status: 'hold',
        delivery: 'today'
      },
      {
        name: 'Cakes Pretty',
        id: 3,
        status: 'exceptional',
        delivery: 'today'
      }
    ];
  }

}
