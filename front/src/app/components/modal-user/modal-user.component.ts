import {Component, OnInit} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ShareService} from "../../share.service";

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {
  faTimes = faTimes
  public section: any;

  constructor(public bsModalRef: BsModalRef, private shared: ShareService) {
  }

  ngOnInit(): void {
    this.shared.registerUser.subscribe(res => {
      this.close();
    })
  }

  close = () => this.bsModalRef.hide()

  cb = (e) => {
    console.log(e)
    this.close()
  }
}
