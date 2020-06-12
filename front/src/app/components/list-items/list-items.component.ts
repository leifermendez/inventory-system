import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  faPlus, faCalendarCheck, faCalendarAlt,
  faArrowLeft, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import {animate, style, transition, trigger} from "@angular/animations";
import {RestService} from "../../rest.service";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit, AfterViewInit {
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  dataIn = [];

  @Input()
  get data() {
    return this.dataIn;
  }

  @Output() dataChange = new EventEmitter();

  set data(val) {

    if (val !== this.dataIn) {
      this.dataIn = val;
      this.dataChange.emit(this.dataIn);
      this.renderList()
    }
  }

  @Input('customTemplate') customTemplate: TemplateRef<any>;
  @ViewChild('viewContainerCustom', {static: false, read: ViewContainerRef})
  viewContainerCustom: ViewContainerRef;
  @ViewChild('defaultCustom') defaultCustom: TemplateRef<any>;
  @Input() title: any = false;
  @Input() mode: any = false;
  @Input() search: any = true;
  @Input() showIcon: any = true;
  @Output() cbSrc = new EventEmitter<any>();
  @Output() cbAdd = new EventEmitter<any>();
  @Output() pagination = new EventEmitter<any>();
  faPlus = faPlus;
  faCalendarCheck = faCalendarCheck;
  faCalendarAlt = faCalendarAlt;
  public src: any = null;

  constructor(public rest: RestService) {
  }

  ngOnInit(): void {

  }

  renderList = () => {
    setTimeout(() => {
      if (this.customTemplate) {
        console.log('1', this.dataIn)
        const viewCustomTemplate = this.customTemplate.createEmbeddedView({
          dat: this.dataIn
        });
        this.viewContainerCustom.insert(viewCustomTemplate);
      } else {

        const viewCustomTemplate = this.defaultCustom.createEmbeddedView(null);
        this.viewContainerCustom.insert(viewCustomTemplate);
      }
    }, 0)
  }

  ngAfterViewInit(): void {


  }

  onChange = (src: string = '') => {
    this.viewContainerCustom.clear();
    this.cbSrc.emit(src)
  }


  callbackAdd = (a: any = {}) => this.cbAdd.emit(a)

}
