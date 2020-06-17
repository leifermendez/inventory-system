import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  NgZone, OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
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
import {Subscription} from "rxjs";

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
export class DetailInvoiceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;
  faFileAlt = faFileAlt;
  faPlus = faPlus;
  faTrashAlt = faTrashAlt;
  faSave = faSave;
  public total = 0;
  public id: any = null;
  public data: any = {};
  public items: any = [];
  bsModalRef: BsModalRef;
  private animationItem: AnimationItem;
  public currency: any = null;
  public currencySymbol: any = null;
  public channel: Subscription;
  private modal: Subscription;

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  constructor(private route: ActivatedRoute,
              private rest: RestService,
              private share: ShareService,
              private ngZone: NgZone,
              private cd: ChangeDetectorRef,
              private modalService: BsModalService) {

  }

  ngOnInit(): void {
    const {currency, currencySymbol} = this.share.getSettings();
    this.currencySymbol = currencySymbol;
    this.currency = currency;
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.loadData()
    });

    this.share.common.subscribe(data => {
      this.items.push(data);
      this.parseData()
    })


    this.modal = this.share.addPurchase.subscribe(data => {
      this.open()
    })

    this.channel = this.share.savePurchase.subscribe(data => {
      this.submitData()
    })


  }

  ngOnDestroy() {
    this.channel.unsubscribe()
    this.modal.unsubscribe()
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  loadData = () => {
    this.rest.get(`purchase/${this.id}`)
      .subscribe(res => {
        const {items} = res
        this.data = res;
        this.items = items;
        this.parseData();
        // this.parseTotal();
      })
  }

  options: AnimationOptions = {
    path: '/assets/images/click.json',
  };

  parseNumber = (n: any = 0) => {
    return parseFloat(n);
  }

  onRemove(event) {
    console.log({action: 'trash', value: event._id})
    this.cbSwipe({action: 'trash', value: event._id})
  }

  parseTotal = () => {

    try {
      let total = 0;
      this.items.forEach(i => {
        const prices = i.prices.find(a => a.amount)
        total += parseFloat(String(i.qty * prices.amount))
      })
      this.total = total;
    } catch (e) {
      this.total = 0;
    }
  }

  parseData = (data: any = null) => {

    try {
      if (!data) {
        data = this.items;
      }
      this.parseTotal();
      this.items = data.map(a => {
        return {...a, ...{id: a._id}}
      })
    } catch (e) {
      this.items = []
    }

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

  getTotal = () => {
    console.log(this.items)
  }

  submitData = () => {
    const body = {
      ...this.data,
      ...{
        items: this.items,
        total: this.total,
      }
    }
    this.rest.patch(`purchase/${this.id}`,
      body)
      .subscribe(res => this.loadData())
  }

  cbSwipe($event: any) {
    const {action, value} = $event;
    console.log(value)
    if (action === 'trash') {
      this.items = this.items.filter(a => {
        console.log(Object.values(a))
        return (!Object.values(a).includes(value));
      })
      this.parseData();
    }

  }
}
