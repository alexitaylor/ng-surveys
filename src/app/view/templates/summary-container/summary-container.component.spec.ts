import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryContainerComponent } from './summary-container.component';

describe('SummaryContainerComponent', () => {
  let component: SummaryContainerComponent;
  let fixture: ComponentFixture<SummaryContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
