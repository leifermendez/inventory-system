import {Directive, ElementRef, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Directive({
  selector: '[appLoadingBtn]'
})
export class LoadingBtnDirective {

  @Input('loadingTextValue') text: string;
  @Input('loadingTextWhen') condition: boolean;
  constructor(private elem: ElementRef, private translate: TranslateService) {
  }

  ngOnInit() {

    if (this.text) {
      if (this.condition) {
        this.elem.nativeElement.innerText = this.text;
      }
    }
  }

  ngOnChanges(changes) {
    console.log(changes.condition.currentValue);

    this.condition = changes.condition.currentValue;
    if (this.text) {
      if (this.condition) {
        this.elem.nativeElement.innerText = this.text;
      } else {
        this.elem.nativeElement.innerText = 'Send';
      }
    }
    // you will get changes in `@input` text here and made changes accordingly
  }

}
