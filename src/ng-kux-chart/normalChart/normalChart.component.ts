import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { UtilsService } from '../Utils.service';
import { Subject } from 'rxjs'
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/data.js')(Highcharts);

//添加hightchart的drilldown
if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
  require('highcharts/modules/drilldown')(Highcharts);
}

@Component({
  selector: 'kux-normal-chart',
  templateUrl: './normalChart.component.html',
  styleUrls: ['./normalChart.component.css']
})
export class NormalChartComponent implements OnInit, AfterViewInit {
  @Input() private chartOptions: any;  //选项
  @Input() private chartType: string;  //图表类型
  @Input() private mapData: Subject<any>;
  @Input() private chartTheme: any;
  constructor(
    private utils: UtilsService
  ) {}

  public ID: string;

  /**
   * setMapData
   */
  public setMapData() {

  }

  public getChartObject() {
    return Highcharts;
  }

  ngOnInit() {
    this.ID = this.utils.getGUID();
    ///设置图表的主题样式
    if (this.chartTheme) {
      Highcharts.theme = this.chartTheme;
      Highcharts.setOptions(Highcharts.theme);
      console.info( Highcharts.theme)
    }
  }
  ngAfterViewInit() {
    switch (this.chartType) {
      case 'map':
      console.info('in map')
      console.info(this.chartOptions)
        require('highcharts/modules/map.js')(Highcharts);
        this.mapData.subscribe((result) => {
          Highcharts.maps[this.chartOptions.chart.map] = result;
          console.info(Highcharts.maps)
          Highcharts.mapChart(this.ID, this.chartOptions)
        });
        break;
      case 'chart':
      default:
        Highcharts.chart(this.ID, this.chartOptions);
    }
  }
}