import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { NormalChartDemoDataService } from './normalChartDemoData.service'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


let fontColor = '#CCD1D1';
let gridLineColor = 'rgba(171, 178, 185,1)';

@Component({
  selector: 'app-normalChartDemo',
  templateUrl: './normalChartDemo.component.html',
  styleUrls: ['./normalChartDemo.component.css'],
  providers: [NormalChartDemoDataService]
})

@Injectable()
export class NormalChartDemoComponent implements OnInit {
  constructor(private normalChartDemoDataService: NormalChartDemoDataService) { 
   this.mapData = normalChartDemoDataService.getMapData();
  }

  /**
   * @description 图表的设置项
   */
  public chartOptions = {
    title: {
      text: 'Solar Employment Growth by Sector, 2010-2016'
    },

    subtitle: {
      text: 'Source: thesolarfoundation.com'
    },

    yAxis: {
      title: {
        text: 'Number of Employees'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        pointStart: 2010
      }
    },

    series: [{
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
    }]

  }

  /**
   * @description 地图的设置项
   */
  public mapOptions = {
    chart: {
      borderWidth: 1,
      map: 'China'
    },

    title: {
      text: 'World population 2013 by country'
    },

    subtitle: {
      text: 'Demo of Highcharts map with bubbles'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },

    series: [{
      data: [
        ['fo', 0],
        ['um', 1],
        ['us', 2],
        ['jp', 3],
        ['sc', 4],
        ['nz', 5],
        ['in', 6]
      ],
      name: 'Random data',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }]
  }

  /**
   * @description 主题的设置项
   */
  public chartTheme = {
    colors: [
      'rgba(52, 152, 219,.8)',
      'rgba(231, 76, 60,.8)',
      'rgba(26, 188, 156,.8)',
      'rgba(241, 196, 15,.8)',
      'rgba(211, 84, 0,.8)',
      'rgba(189, 195, 199,.8)',
      'rgba(44, 62, 80,.8)',],
    chart: {
      backgroundColor: 'black',
    },
    title: {
      style: {
        color: fontColor,
        font: 'normal 16px "Trebuchet MS", Verdana, sans-serif'
      }
    },
    subtitle: {
      style: {
        color: fontColor,
        font: 'normal 12px "Trebuchet MS", Verdana, sans-serif'
      }
    },

    legend: {
      itemStyle: {
        font: '9pt Trebuchet MS, Verdana, sans-serif',
        color: fontColor
      },
      itemHoverStyle: {
        color: fontColor
      }
    },
    label: {
      color: 'red'
    },
    xAxis: {
      lineColor: gridLineColor,
      labels: {
        style: {
          color: fontColor
        }
      }
    },
    yAxis: {
      lineColor: gridLineColor,
      gridLineColor: gridLineColor,
      labels: {
        style: {
          color: fontColor
        }
      }
    }
  };

  public mapData: any;

  ngOnInit() {
  }

}