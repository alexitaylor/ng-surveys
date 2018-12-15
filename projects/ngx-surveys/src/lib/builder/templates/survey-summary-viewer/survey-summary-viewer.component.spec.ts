import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveySummaryViewerComponent } from './survey-summary-viewer.component';

describe('SurveySummaryViewerComponent', () => {
  let component: SurveySummaryViewerComponent;
  let fixture: ComponentFixture<SurveySummaryViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveySummaryViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveySummaryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
