import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAddonsComponent } from './list-addons.component';

describe('ListAddonsComponent', () => {
  let component: ListAddonsComponent;
  let fixture: ComponentFixture<ListAddonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAddonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
