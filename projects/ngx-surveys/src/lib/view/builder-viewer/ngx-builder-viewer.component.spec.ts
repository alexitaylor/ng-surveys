import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxBuilderViewerComponent } from './ngx-builder-viewer.component';

describe('NgxBuilderViewerComponent', () => {
  let component: NgxBuilderViewerComponent;
  let fixture: ComponentFixture<NgxBuilderViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxBuilderViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxBuilderViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
