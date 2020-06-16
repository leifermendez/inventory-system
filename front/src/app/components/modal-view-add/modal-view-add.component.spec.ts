import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewAddComponent } from './modal-view-add.component';

describe('ModalViewAddComponent', () => {
  let component: ModalViewAddComponent;
  let fixture: ComponentFixture<ModalViewAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
