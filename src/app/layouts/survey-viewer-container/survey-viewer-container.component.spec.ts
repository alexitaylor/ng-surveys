import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyViewerContainerComponent } from './survey-viewer-container.component';

describe('SurveyViewerContainerComponent', () => {
  let component: SurveyViewerContainerComponent;
  let fixture: ComponentFixture<SurveyViewerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyViewerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
