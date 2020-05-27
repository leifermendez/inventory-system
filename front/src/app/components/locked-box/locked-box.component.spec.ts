import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockedBoxComponent } from './locked-box.component';

describe('LockedBoxComponent', () => {
  let component: LockedBoxComponent;
  let fixture: ComponentFixture<LockedBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockedBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockedBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
