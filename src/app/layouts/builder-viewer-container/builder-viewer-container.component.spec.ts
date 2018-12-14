import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderViewerContainerComponent } from './builder-viewer-container.component';

describe('BuilderViewerContainerComponent', () => {
  let component: BuilderViewerContainerComponent;
  let fixture: ComponentFixture<BuilderViewerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderViewerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
