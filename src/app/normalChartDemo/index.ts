import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './normalChartDemo.routes';
import { NormalChartDemoComponent } from './normalChartDemo.component';
import { NormalChartModule } from '../../ng-kux-chart';
import { NormalChartDemoDataService } from './normalChartDemoData.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NormalChartModule
  ],
  providers: [NormalChartDemoDataService],
  declarations: [NormalChartDemoComponent]
})
export class NormalChartDemoModule { }