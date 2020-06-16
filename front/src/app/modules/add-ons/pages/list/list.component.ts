import {Component, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {ModalViewAddComponent} from "../../../../components/modal-view-add/modal-view-add.component";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public source = '';
  bsModalRef: BsModalRef;
  public history: any = [
    {
      name: 'Complementos'
    }
  ]

  options: AnimationOptions = {
    path: '/assets/images/add-ons.json',
  };
  private animationItem: AnimationItem;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit(): void {
  }


}
