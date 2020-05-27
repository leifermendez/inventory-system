import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingBoxComponent } from './working-box.component';

describe('WorkingBoxComponent', () => {
  let component: WorkingBoxComponent;
  let fixture: ComponentFixture<WorkingBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkingBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
