import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {Variables} from '../config/config';
import {AppComponent} from '../app.component';

import * as d3 from 'd3';
import * as c3 from 'c3';



@Component({
  selector: 'app-chart-solar-rad',
  templateUrl: './chart-solar-rad.component.html',
  styleUrls: ['./chart-solar-rad.component.css']
})
export class ChartSolarRadComponent implements OnInit {


    constructor(private newService: CommonService) {
    }

    public EditFechaSR = false;
    public EditMonthSR = false;
    DataTemp;
    DataProm;
    chart;
    TempGroup = [];

    ngOnInit() {
        this.newService.GetVariablesFechas().subscribe(data => {
            this.DataTemp = data;
            // this.cargarFechas(data);
            this.createbarC3_SolarRad(data, Variables.SolarRad);
        });

    }
    createbarC3_SolarRad(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartRadiacion',
            data: {
                json: data,
                keys: {
                    //  x: 'Time', // it's possible to specify 'x' when category axis
                    value: variableC
                }, types: {
                    lowTemp: 'area-spline',
                    tempOut: 'area-spline',
                    hiTemp: 'area-spline'
                    // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
                },
                names:
                    {
                        SolarRad: 'Radiacion',
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
                this.EditFechaSR = true;
                this.EditMonthSR = false;
                console.log('lapso');
                break;
            case 'Hoy':
                console.log('hoy');
                this.EditFechaSR = false;
                this.EditMonthSR = false;
                break;
            case 'Mensual':
                console.log('mensual');
                this.EditFechaSR = false;
                this.EditMonthSR = true;
                break;
            case 'Anual':
                console.log('anual');
                this.EditFechaSR = false;
                this.EditMonthSR = false;
                break;
        }
    }

}
