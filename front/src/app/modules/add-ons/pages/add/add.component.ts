import {Component, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalViewAddComponent} from "../../../../components/modal-view-add/modal-view-add.component";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }


}
