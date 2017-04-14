import { Injectable } from '@angular/core';

var Highcharts = require('highcharts');
@Injectable()
export class ToolService {
    constructor() { }
    static setTheme(chart: any) {
        chart.setOptions(chart.theme);
    }
}