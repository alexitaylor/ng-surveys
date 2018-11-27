import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewerComponent } from './model-viewer.component';

describe('ModelViewerComponent', () => {
  let component: ModelViewerComponent;
  let fixture: ComponentFixture<ModelViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
