import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageViewerContainerComponent } from '../../../../app/view/templates/page-viewer-container/page-viewer-container.component';

describe('PageViewerContainerComponent', () => {
  let component: PageViewerContainerComponent;
  let fixture: ComponentFixture<PageViewerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageViewerContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageViewerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
