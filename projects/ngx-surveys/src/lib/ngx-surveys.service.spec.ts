import { TestBed } from '@angular/core/testing';

import { NgxSurveysService } from './ngx-surveys.service';

describe('NgxSurveysService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxSurveysService = TestBed.get(NgxSurveysService);
    expect(service).toBeTruthy();
  });
});
