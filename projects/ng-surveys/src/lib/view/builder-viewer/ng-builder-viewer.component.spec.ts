import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgBuilderViewerComponent } from './ng-builder-viewer.component';

describe('NgBuilderViewerComponent', () => {
  let component: NgBuilderViewerComponent;
  let fixture: ComponentFixture<NgBuilderViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgBuilderViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgBuilderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
