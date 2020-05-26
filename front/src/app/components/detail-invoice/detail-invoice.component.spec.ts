import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailInvoiceComponent } from './detail-invoice.component';

describe('DetailInvoiceComponent', () => {
  let component: DetailInvoiceComponent;
  let fixture: ComponentFixture<DetailInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
