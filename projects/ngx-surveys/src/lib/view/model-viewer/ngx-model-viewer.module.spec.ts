import { NgxModelViewerModule } from './ngx-model-viewer.module';

describe('NgxModelViewerModule', () => {
  let ngxModelViewerModule: NgxModelViewerModule;

  beforeEach(() => {
    ngxModelViewerModule = new NgxModelViewerModule();
  });

  it('should create an instance', () => {
    expect(ngxModelViewerModule).toBeTruthy();
  });
});
