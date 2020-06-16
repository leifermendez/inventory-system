import {Component, NgZone, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {AnimationItem} from "lottie-web";
import {BsModalRef} from "ngx-bootstrap/modal";
import {
  faTimes
}
  from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DemoFilePickerAdapter} from "../../demo-file-picker.adapter";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-modal-wizard',
  templateUrl: './modal-wizard.component.html',
  styleUrls: ['./modal-wizard.component.css']
})
export class ModalWizardComponent implements OnInit {
  adapter = new DemoFilePickerAdapter(this.http);
  public form: FormGroup;
  faTimes = faTimes
  options: AnimationOptions = {
    path: '/assets/images/wizard.json',
  };
  private animationItem: AnimationItem;

  constructor(private ngZone: NgZone, public bsModalRef: BsModalRef,
              private http: HttpClient,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      currency: ['', Validators.required],
      logo: [''],
    });
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

  close = () => {
    this.bsModalRef.hide()
  }

  update() {

  }
}
