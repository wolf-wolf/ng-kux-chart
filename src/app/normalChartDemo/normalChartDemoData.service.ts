import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class NormalChartDemoDataService {

    constructor(private http: Http) {
    }

    getMapData() {
        return this.http.get('../../assets/data/china.json').map((res: any) => res.json());
    }
}