import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseFormComponent } from './purchase-form.component';

describe('PurchaseFormComponent', () => {
  let component: PurchaseFormComponent;
  let fixture: ComponentFixture<PurchaseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
