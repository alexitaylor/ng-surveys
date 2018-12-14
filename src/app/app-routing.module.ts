import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import {Shell} from './shell/shell.service';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { NgxBuilderViewerComponent, NgxSurveyViewerComponent, NgxModelViewerComponent } from 'ngx-surveys';

export const routes: Routes = [
  Shell.childRoutes(
    [
      {
        path: '',
        component: NgxBuilderViewerComponent
      },
      {
        path: 'viewer',
        component: NgxSurveyViewerComponent,
      },
      {
        path: 'model',
        component: NgxModelViewerComponent,
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
