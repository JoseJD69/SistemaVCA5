import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {Variables} from '../config/config';
import {AppComponent} from '../app.component';

import * as d3 from 'd3';
import * as c3 from 'c3';

@Component({
    selector: 'app-chart-humidity',
    templateUrl: './chart-humidity.component.html',
    styleUrls: ['./chart-humidity.component.css']
})
export class ChartHumidityComponent implements OnInit {

    constructor(private newService: CommonService) {
    }

    public EditFechaH = false;
    public EditMonthH = false;
    DataTemp;
    chart;
    TempGroup = [];

    ngOnInit() {
        this.newService.GetVariablesFechas().subscribe(data => {
            this.DataTemp = data;
            // this.cargarFechas(data);
            this.createbarC3_Humidity(data, Variables.Humidity);
        });
    }

    createbarC3_Humidity(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartHumedad',
            data: {
                json: data,
                keys: {
                    //  x: 'Time', // it's possible to specify 'x' when category axis
                    value: variableC
                },
                names:
                    {
                        outHum: 'Humedad'
                    }, type: 'spline'

            }, axis: {},
            tooltip: {
                format: {
                    title: function (d) {
                        return '' + d;
                    },
                    value: function (value) {
                        return (value);
                    },
                },
            },
            zoom: {
                enabled: true
            },
            bar: {
                width: {
                    ratio: 0.5// this makes bar width 50% of length between ticks
                }
            }
        })
        ;

    }

    onChangeTime(value) {
        const val = null;
        this.SelectTimeCurrent(value);
    }

    SelectTimeCurrent(value) {
        switch (value) {
            case 'Lapso de tiempo':
                this.EditFechaH = true;
                this.EditMonthH = false;
                console.log('lapso');
                break;
            case 'Hoy':
                console.log('hoy');
                this.EditFechaH = false;
                this.EditMonthH = false;
                break;
            case 'Mensual':
                console.log('mensual');
                this.EditFechaH = false;
                this.EditMonthH = true;
                break;
            case 'Anual':
                console.log('anual');
                this.EditFechaH = false;
                this.EditMonthH = false;
                break;
        }
    }

}
