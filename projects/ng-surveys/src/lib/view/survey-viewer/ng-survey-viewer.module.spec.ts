import {describe, expect} from '@angular/core/testing/src/testing_internal';
import { NgSurveyViewerModule } from './ng-survey-viewer.module';

describe('NgSurveyViewerModule', () => {
  let ngSurveyViewerModule: NgSurveyViewerModule;

  beforeEach((): any => {
    ngSurveyViewerModule = new NgSurveyViewerModule();
  });

  it('should create an instance', (): any => {
    expect(ngSurveyViewerModule).toBeTruthy();
  });
});
