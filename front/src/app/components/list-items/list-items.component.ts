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
import {faPlus, faCalendarCheck, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css']
})
export class ListItemsComponent implements OnInit, AfterViewInit {

  dataIn = [];

  @Input()
  get data() {
    return this.dataIn;
  }

  @Output() dataChange = new EventEmitter();

  set data(val) {
    this.dataIn = val;
    this.dataChange.emit(this.dataIn);
    this.ngAfterViewInit()
  }

  @Input('customTemplate') customTemplate: TemplateRef<any>;
  @ViewChild('viewContainerCustom', {static: false, read: ViewContainerRef})
  viewContainerCustom: ViewContainerRef;
  @ViewChild('defaultCustom') defaultCustom: TemplateRef<any>;
  @Input() title: string;
  @Input() mode: any = false;
  @Output() cbAdd = new EventEmitter<any>();
  faPlus = faPlus;
  faCalendarCheck = faCalendarCheck;
  faCalendarAlt = faCalendarAlt;

  constructor() {
  }

  ngOnInit(): void {


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.customTemplate) {
        // console.log('1', this.dataIn)
        const viewCustomTemplate = this.customTemplate.createEmbeddedView({
          dat: this.dataIn
        });
        // console.log(viewCustomTemplate)
        this.viewContainerCustom.insert(viewCustomTemplate);
      } else {
        console.log('0')
        const viewCustomTemplate = this.defaultCustom.createEmbeddedView(null);
        this.viewContainerCustom.insert(viewCustomTemplate);
      }
    },0)

  }

  callbackAdd = (a: any = {}) => this.cbAdd.emit(a)

}
