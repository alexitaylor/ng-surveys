import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {Shell} from './shell/shell.service';
import {NotFoundComponent} from './layouts/not-found/not-found.component';
import {ViewerComponent} from './view/viewer/viewer.component';
import {BuilderViewerComponent} from './view/builder-viewer/builder-viewer.component';
import {ModelViewerComponent} from './view/model-viewer/model-viewer.component';

const routes: Routes = [
  Shell.childRoutes(
    [
      {
        path: '',
        component: BuilderViewerComponent
      },
      {
        path: 'viewer',
        component: ViewerComponent
      },
      {
        path: 'model',
        component: ModelViewerComponent
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
export class AppRoutingModule { }
