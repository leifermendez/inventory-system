import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateComponent } from './modal-update.component';

describe('ModalUpdateComponent', () => {
  let component: ModalUpdateComponent;
  let fixture: ComponentFixture<ModalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
