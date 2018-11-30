import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCheckboxSelectComponent } from '../../../../../app/builder/question-type/radio-checkbox-select/radio-checkbox-select.component';

describe('RadioCheckboxSelectComponent', () => {
  let component: RadioCheckboxSelectComponent;
  let fixture: ComponentFixture<RadioCheckboxSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioCheckboxSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioCheckboxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
