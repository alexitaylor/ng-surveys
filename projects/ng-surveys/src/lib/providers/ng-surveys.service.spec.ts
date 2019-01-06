import { TestBed } from '@angular/core/testing';

import { NgSurveysService } from './ng-surveys.service';

describe('NgSurveysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgSurveysService = TestBed.get(NgSurveysService);
    expect(service).toBeTruthy();
  });
});
