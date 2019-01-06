import { NgModelViewerModule } from './ng-model-viewer.module';

describe('NgModelViewerModule', () => {
  let ngModelViewerModule: NgModelViewerModule;

  beforeEach(() => {
    ngModelViewerModule = new NgModelViewerModule();
  });

  it('should create an instance', () => {
    expect(ngModelViewerModule).toBeTruthy();
  });
});
