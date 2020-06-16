import {Component, OnInit} from '@angular/core';
import {
  faAngleRight,
  faEllipsisV,
  faPlug
} from '@fortawesome/free-solid-svg-icons';
import {ModalViewAddComponent} from "../modal-view-add/modal-view-add.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-list-addons',
  templateUrl: './list-addons.component.html',
  styleUrls: ['./list-addons.component.css']
})
export class ListAddonsComponent implements OnInit {
  faPlug = faPlug
  faEllipsisV = faEllipsisV
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }

  open(data: any = null) {
    const initialState = {
      section: data
    };

    this.bsModalRef = this.modalService.show(
      ModalViewAddComponent,
      Object.assign({initialState}, {
        class: 'modal-light-plan',
        ignoreBackdropClick: false
      })
    );
  }

}
