import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {TabsetComponent} from "ngx-bootstrap/tabs";
import {
  faTrashAlt, faFileAlt, faBox, faFolderOpen, faCrown, faChartPie, faUsers, faAngleRight,
  faSave, faPlus
}
  from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from "@angular/router";
import {RestService} from "../../rest.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalProductComponent} from "../modal-product/modal-product.component";
import {ShareService} from "../../share.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-detail-invoice',
  templateUrl: './detail-invoice.component.html',
  styleUrls: ['./detail-invoice.component.css'],
  animations: [
    trigger('swipe', [
      transition(':enter', [
        style({opacity: '.6'}),
        animate('0.15s ease-in')
      ])
    ])
  ]

})
export class DetailInvoiceComponent implements OnInit {
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;
  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  public id: any = null;
  public data: any = {};
  public items: any = [];
  bsModalRef: BsModalRef;
  private animationItem: AnimationItem;

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private share: ShareService,
              private ngZone: NgZone,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.loadData()
    });

    this.share.common.subscribe(data => this.items.push(data))
  }

  loadData = () => {
    this.rest.get(`purchase/${this.id}`)
      .subscribe(res => {
        const {items} = res
        this.data = res;
        this.items = items;
      })
  }

  options: AnimationOptions = {
    path: '/assets/images/click.json',
  };

  onRemove(event) {
    console.log(event);
    this.items.splice(this.items.indexOf(event), 1);
  }

  open(data: any = null) {
    const initialState = {
      section: data
    };

    this.bsModalRef = this.modalService.show(
      ModalProductComponent,
      Object.assign({initialState}, {
        class: 'modal-light-plan',
        ignoreBackdropClick: false
      })
    );
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
    // this.animationItem.stop();
  }

  loopComplete(e): void {
    // e.stop().then();
    this.pause()
  }

  stop(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.stop());
  }

  pause(): void {
    this.ngZone.runOutsideAngular(() => this.animationItem.setSegment(43, 44));
  }

  save() {
    this.share.confirm().then(r => {
      this.submitData();
    })

  }

  submitData = () => {
    const body = {...this.data, ...{items: this.items}}
    this.rest.patch(`purchase/${this.id}`,
      body)
      .subscribe(res => this.loadData())
  }
}
