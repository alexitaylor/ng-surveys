import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSurveyViewerComponent } from './ng-survey-viewer.component';

describe('NgSurveyViewerComponent', () => {
  let component: NgSurveyViewerComponent;
  let fixture: ComponentFixture<NgSurveyViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSurveyViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSurveyViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
