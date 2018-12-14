import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {Shell} from './shell/shell.service';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { NgxSurveyViewerComponent } from 'ngx-surveys';
import {BuilderViewerContainerComponent} from './layouts/builder-viewer-container/builder-viewer-container.component';
import {ModelViewerContainerComponent} from './layouts/model-viewer-container/model-viewer-container.component';
import {SurveyViewerContainerComponent} from './layouts/survey-viewer-container/survey-viewer-container.component';

export const routes: Routes = [
  Shell.childRoutes(
    [
      {
        path: '',
        component: BuilderViewerContainerComponent,
      },
      {
        path: 'viewer',
        component: SurveyViewerContainerComponent,
      },
      {
        path: 'viewer/:pageId',
        component: SurveyViewerContainerComponent,
      },
      {
        path: 'model',
        component: ModelViewerContainerComponent,
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
