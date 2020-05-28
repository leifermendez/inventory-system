import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  faSave,
  faTrashAlt
}
  from '@fortawesome/free-regular-svg-icons';
import {
  faExclamation,
  faList
}
  from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-section-btn',
  templateUrl: './section-btn.component.html',
  styleUrls: ['./section-btn.component.css']
})
export class SectionBtnComponent implements OnInit {
  @Input() valid: boolean;
  @Output() cbSave = new EventEmitter<any>();
  @Output() cbList = new EventEmitter<any>();
  faSave = faSave
  faList = faList
  faTrashAlt = faTrashAlt
  faExclamation = faExclamation

  constructor() {
  }

  ngOnInit(): void {
  }

  callbackList = (a: any = {}) => this.cbList.emit(a)
}
