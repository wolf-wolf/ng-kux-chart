import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppRouteComponent } from './app.component'
const APP_ROUTES: Routes = [
  {
    path: '', component: AppRouteComponent,
    children: [
      {
        path: 'chart',
        loadChildren: './normalChartDemo#NormalChartDemoModule'
      }, {
        path: '**',
        redirectTo: 'chart'
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
