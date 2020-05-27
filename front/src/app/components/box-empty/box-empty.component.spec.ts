import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxEmptyComponent } from './box-empty.component';

describe('BoxEmptyComponent', () => {
  let component: BoxEmptyComponent;
  let fixture: ComponentFixture<BoxEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
