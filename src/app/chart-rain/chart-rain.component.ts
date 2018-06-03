import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {Variables} from '../config/config';

import * as d3 from 'd3';
import * as c3 from 'c3';


@Component({
    selector: 'app-chart-rain',
    templateUrl: './chart-rain.component.html',
    styleUrls: ['./chart-rain.component.css']
})
export class ChartRainComponent implements OnInit {

    constructor(private newService: CommonService) {
    }

    DataRain;
    chart;
    public EditFechaP = false;
    public EditMonthP = false;

    ngOnInit() {
        this.newService.GetVariablesFechas().subscribe(data => {
            this.DataRain = data;
            this.createbarC3_Rain(data, Variables.Rain);
        });
    }


    createbarC3_Rain(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartPrecipitacion',
            data: {
                json: data,
                keys: {
                    //  x: '_id', // it's possible to specify 'x' when category axis
                    value: variableC
                },
                names:
                    {
                        Rain: 'Precipitación'
                    }, type: 'spline'

            }, axis: {
                x: {
                    /* type: 'category',
                     categories: this.fechasIn,
                     tick: {
                         rotate: 75,
                         multiline: false
                     },
                     height: 130*/
                }
            },
            zoom: {
                enabled: true
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
            }
        });
    }
    onChangeTime(value) {
        const val = null;
        this.SelectTimeCurrent(value);
    }

    SelectTimeCurrent(value) {
        switch (value) {
            case 'Lapso de tiempo':
                this.EditFechaP = true;
                this.EditMonthP = false;
                console.log('lapso');
                break;
            case 'Hoy':
                console.log('hoy');
                this.EditFechaP = false;
                this.EditMonthP = false;
                break;
            case 'Mensual':
                console.log('mensual');
                this.EditFechaP = false;
                this.EditMonthP = true;
                break;
            case 'Anual':
                console.log('anual');
                this.EditFechaP = false;
                this.EditMonthP = false;
                break;
        }
    }
}
