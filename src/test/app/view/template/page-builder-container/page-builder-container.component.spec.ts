import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBuilderContainerComponent } from '../../../../../app/view/templates/page-builder-container/page-builder-container.component';

describe('PageBuilderContainerComponent', () => {
  let component: PageBuilderContainerComponent;
  let fixture: ComponentFixture<PageBuilderContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBuilderContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBuilderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
