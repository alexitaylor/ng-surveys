import { NgxBuilderViewerModule } from './ngx-builder-viewer.module';

describe('BuilderViewerModule', () => {
  let builderViewerModule: NgxBuilderViewerModule;

  beforeEach(() => {
    builderViewerModule = new NgxBuilderViewerModule();
  });

  it('should create an instance', () => {
    expect(builderViewerModule).toBeTruthy();
  });
});
