import {describe, expect} from '@angular/core/testing/src/testing_internal';
import { NgxSurveyViewerModule } from './ngx-survey-viewer.module';

describe('NgxSurveyViewerModule', () => {
  let ngxSurveyViewerModule: NgxSurveyViewerModule;

  beforeEach((): any => {
    ngxSurveyViewerModule = new NgxSurveyViewerModule();
  });

  it('should create an instance', (): any => {
    expect(ngxSurveyViewerModule).toBeTruthy();
  });
});
