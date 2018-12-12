import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxModelViewerComponent } from './ngx-model-viewer.component';

describe('NgxModelViewerComponent', () => {
  let component: NgxModelViewerComponent;
  let fixture: ComponentFixture<NgxModelViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxModelViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxModelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
