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
    Fdia: any;
    FMes: any;
    chart;
    public EditFechaP = false;
    public EditMonthP = false;
    public EditDiaP = false;
    SelectTime: { [key: string]: any } = {
        option: '1'
    };

    ngOnInit() {
        this.newService.GetVariablesComponentes('02/03/18', 'Dia', Variables.Rain).subscribe(data => {
            this.DataRain = data;
            // this.cargarFechas(data);
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
                this.newService.GetVariablesComponentes(this.Fdia, option, Variables.Rain).subscribe(data => {
                    this.DataRain = data;
                    // this.cargarFechas(data);
                    this.createbarC3_Rain(data, Variables.Rain);
                });
                break;
            case 'Mensual':
                this.newService.GetVariablesComponentes(this.FMes, option, Variables.Rain).subscribe(data => {
                    this.DataRain = data;
                    // this.cargarFechas(data);
                    this.createbarC3_Rain(data, Variables.Rain);
                });
                break;
        }
    }

    SelectTimeCurrent(value) {
        switch (value) {
            case 'Lapso de tiempo':
                this.EditFechaP = true;
                this.EditMonthP = false;
                this.EditDiaP = false;
                console.log('lapso');
                break;
            case 'Dia':
                this.EditFechaP = false;
                this.EditMonthP = false;
                this.EditDiaP = true ;
                break;
            case 'Mensual':
                this.EditFechaP = false;
                this.EditMonthP = true;
                this.EditDiaP = false;
                break;
            case 'Anual':
                this.EditFechaP = false;
                this.EditMonthP = false;
                this.EditDiaP = false;
                break;
        }
    }
}
