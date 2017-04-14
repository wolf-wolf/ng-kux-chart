import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NormalChartComponent } from './normalChart.component';
import { UtilsService } from '../Utils.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [UtilsService],
  declarations: [NormalChartComponent],
  exports: [NormalChartComponent]
})
export class NormalChartModule { }