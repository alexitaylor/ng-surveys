import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgModelViewerComponent } from './ng-model-viewer.component';

describe('NgModelViewerComponent', () => {
  let component: NgModelViewerComponent;
  let fixture: ComponentFixture<NgModelViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgModelViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgModelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
