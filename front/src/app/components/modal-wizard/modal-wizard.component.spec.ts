import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalWizardComponent } from './modal-wizard.component';

describe('ModalWizardComponent', () => {
  let component: ModalWizardComponent;
  let fixture: ComponentFixture<ModalWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
