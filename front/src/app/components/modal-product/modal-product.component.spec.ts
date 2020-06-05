import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProductComponent } from './modal-product.component';

describe('ModalProductComponent', () => {
  let component: ModalProductComponent;
  let fixture: ComponentFixture<ModalProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
