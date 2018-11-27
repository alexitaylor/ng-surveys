import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBuilderComponent } from './question-builder.component';

describe('QuestionBuilderComponent', () => {
  let component: QuestionBuilderComponent;
  let fixture: ComponentFixture<QuestionBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
