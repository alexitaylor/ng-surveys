import { TestBed } from '@angular/core/testing';

import { NgSurveyViewerNavigationService } from './ng-survey-viewer-navigation.service';

describe('NgSurveyViewerNavigationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSurveyViewerNavigationService = TestBed.get(NgSurveyViewerNavigationService);
    expect(service).toBeTruthy();
  });
});
