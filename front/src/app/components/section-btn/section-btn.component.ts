import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  faSave,
  faTrashAlt,
}
  from '@fortawesome/free-regular-svg-icons';
import {
  faExclamation,
  faPlus,
  faList
}
  from '@fortawesome/free-solid-svg-icons';
import {ShareService} from "../../share.service";

@Component({
  selector: 'app-section-btn',
  templateUrl: './section-btn.component.html',
  styleUrls: ['./section-btn.component.css']
})
export class SectionBtnComponent implements OnInit {
  @ViewChild('btnList') btnList: any;
  @ViewChild('btnAdd') btnAdd: any;
  @ViewChild('btnTrash') btnTrash: any;
  @ViewChild('btnSave') btnSave: any;
  @Input() valid: boolean;
  @Input() trash: boolean;
  @Input() add: boolean;
  @Output() cbSave = new EventEmitter<any>();
  @Output() cbAdd = new EventEmitter<any>();
  @Output() cbList = new EventEmitter<any>();
  @Output() cbTrash = new EventEmitter<any>();
  faSave = faSave
  faList = faList
  faTrashAlt = faTrashAlt
  faPlus = faPlus
  faExclamation = faExclamation
  copilot: any;

  constructor(private shared: ShareService) {
  }

  ngOnInit(): void {
    this.startCopilot()

  }

  private startCopilot = () => {
    this.copilot = false;
    this.shared.openCopilot('btnList')
      .then(res => {
        if (!res && (this.btnList)) {
          this.copilot = true;
          setTimeout(() => {
            this.btnList.show();
          }, 100)

        }
      })

    this.shared.openCopilot('btnAdd')
      .then(res => {
        if (!res && (this.btnAdd)) {
          this.copilot = true;
          setTimeout(() => {
            this.btnAdd.show();
          }, 100)
        }
      })

    this.shared.openCopilot('btnSave')
      .then(res => {
        if (!res && (this.btnSave)) {
          this.copilot = true;
          setTimeout(() => {
            this.btnSave.show();
          }, 100)
        }
      })

    this.shared.openCopilot('btnTrash')
      .then(res => {
        if (!res && (this.btnTrash)) {
          this.copilot = true;
          setTimeout(() => {
            this.btnTrash.show();
          }, 100)
        }
      })
  }

  delete = () => {
    this.shared.confirm()
      .then(res => this.cbTrash.emit(res))
  }

  callbackAdd = (a: any = {}) => this.cbAdd.emit(a)

  callbackList = (a: any = {}) => this.cbList.emit(a)

  callbackSave = (a: any = {}) => this.cbSave.emit(a)

  closeCopilot = (section = null, model: any) => {
    try {
      this.shared.saveCopilot(section)
        .then(() => {
          model.hide();
          this.startCopilot()
        })
    } catch (e) {
      return null
    }
  }
}
