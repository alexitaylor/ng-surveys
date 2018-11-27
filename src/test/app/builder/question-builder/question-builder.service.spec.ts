import { TestBed } from '@angular/core/testing';

import { QuestionBuilderService } from './question-builder.service';

describe('QuestionBuilderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionBuilderService = TestBed.get(QuestionBuilderService);
    expect(service).toBeTruthy();
  });
});
