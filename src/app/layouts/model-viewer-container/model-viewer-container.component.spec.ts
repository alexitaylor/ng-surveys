import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelViewerContainerComponent } from './model-viewer-container.component';

describe('ModelViewerContainerComponent', () => {
  let component: ModelViewerContainerComponent;
  let fixture: ComponentFixture<ModelViewerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelViewerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
