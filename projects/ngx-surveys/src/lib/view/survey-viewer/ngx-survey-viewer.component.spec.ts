import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSurveyViewerComponent } from './ngx-survey-viewer.component';

describe('NgxSurveyViewerComponent', () => {
  let component: NgxSurveyViewerComponent;
  let fixture: ComponentFixture<NgxSurveyViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSurveyViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSurveyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
