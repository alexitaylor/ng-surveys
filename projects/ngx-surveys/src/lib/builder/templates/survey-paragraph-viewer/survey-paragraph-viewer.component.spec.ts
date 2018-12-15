import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyParagraphViewerComponent } from './survey-paragraph-viewer.component';

describe('SurveyParagraphViewerComponent', () => {
  let component: SurveyParagraphViewerComponent;
  let fixture: ComponentFixture<SurveyParagraphViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyParagraphViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyParagraphViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
