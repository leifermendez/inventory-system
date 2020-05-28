import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionBtnComponent } from './section-btn.component';

describe('SectionBtnComponent', () => {
  let component: SectionBtnComponent;
  let fixture: ComponentFixture<SectionBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
