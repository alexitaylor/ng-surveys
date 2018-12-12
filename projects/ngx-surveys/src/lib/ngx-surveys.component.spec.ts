import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSurveysComponent } from './ngx-surveys.component';

describe('NgxSurveysComponent', () => {
  let component: NgxSurveysComponent;
  let fixture: ComponentFixture<NgxSurveysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxSurveysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxSurveysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
