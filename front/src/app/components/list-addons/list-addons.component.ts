import {Component, OnInit} from '@angular/core';
import {
  faAngleRight,
  faEllipsisV,
  faPlug
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-addons',
  templateUrl: './list-addons.component.html',
  styleUrls: ['./list-addons.component.css']
})
export class ListAddonsComponent implements OnInit {
  faPlug = faPlug
  faEllipsisV = faEllipsisV

  constructor() {
  }

  ngOnInit(): void {
  }

}
