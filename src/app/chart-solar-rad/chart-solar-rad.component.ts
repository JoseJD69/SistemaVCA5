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
    public EditDiaSR = false;
    SelectTime: { [key: string]: any } = {
        option: '1'
    };
    DataTemp;
    Fdia: any;
    FMes: any;
    chart;
    TempGroup = [];

    ngOnInit() {
        this.newService.GetVariablesComponentes('02/03/18', 'Dia', Variables.SolarRad).subscribe(data => {
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

            }, axis: {
                y:
                {
                    label:' W/m2'
                }
            },
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
        this.SelectTimeCurrent(value);
    }

    onSelectTime() {
        const option = this.SelectTime.option;
        console.log(this.SelectTime.option);
        console.log(this.Fdia);
        console.log(this.FMes);
        this.crearGrapics(option);
    }
    crearGrapics(option) {
        switch (option) {
            case 'Dia':
                this.newService.GetVariablesComponentes(this.Fdia, option, Variables.SolarRad).subscribe(data => {
                    this.DataTemp = data;
                    // this.cargarFechas(data);
                    this.createbarC3_SolarRad(data, Variables.SolarRad);
                });
                break;
            case 'Mensual':
                this.newService.GetVariablesComponentes(this.FMes, option, Variables.SolarRad).subscribe(data => {
                    this.DataTemp = data;
                    // this.cargarFechas(data);
                    this.createbarC3_SolarRad(data, Variables.SolarRad);
                });
                break;
        }
    }
    SelectTimeCurrent(value) {
        switch (value) {
            case 'Lapso de tiempo':
                this.EditFechaSR = true;
                this.EditMonthSR = false;
                this.EditDiaSR = false;
                break;
            case 'Dia':
                this.EditDiaSR = true;
                this.EditFechaSR = false;
                this.EditMonthSR = false;
                break;
            case 'Mensual':
                this.EditFechaSR = false;
                this.EditMonthSR = true;
                this.EditDiaSR = false;
                break;
            case 'Anual':
                this.EditFechaSR = false;
                this.EditMonthSR = false;
                this.EditDiaSR = false;
                break;
        }
    }

}
