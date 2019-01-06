import { NgBuilderViewerModule } from './ng-builder-viewer.module';

describe('BuilderViewerModule', () => {
  let builderViewerModule: NgBuilderViewerModule;

  beforeEach(() => {
    builderViewerModule = new NgBuilderViewerModule();
  });

  it('should create an instance', () => {
    expect(builderViewerModule).toBeTruthy();
  });
});
