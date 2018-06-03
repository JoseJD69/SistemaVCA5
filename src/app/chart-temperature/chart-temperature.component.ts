import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {Variables} from '../config/config';
import {AppComponent} from '../app.component';


import * as d3 from 'd3';
import * as c3 from 'c3';


@Component({
    selector: 'app-chart-temperature',
    templateUrl: './chart-temperature.component.html',
    styleUrls: ['./chart-temperature.component.css']
})
export class ChartTemperatureComponent implements OnInit {


    public EditFecha = false;
    public EditMonth = false;
    public EditDia = false;
    SelectTime: { [key: string]: any } = {
        option: '1'
    };
    DataTemp;
    DataProm;
    chart;
    TempGroup = [];

    constructor(private newService: CommonService, private newServiceProm: CommonService) {

    }


    ngOnInit() {
        this.newService.GetVariablesFechas().subscribe(data => {
            this.DataTemp = data;
            console.log(data);
            // this.cargarFechas(data);
            // this.createbarC3_Temperature(data, Variables.default);
        });
        this.newServiceProm.GetVariablesProm('08/18').subscribe(data => {
            this.DataProm = data;
            console.log(data);
            this.createbarC3_Temperature(data, Variables.default);
        });
    }

    createbarC3_Temperature(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartTemperature',
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
                        lowTemp: 'Temperatura Mimina',
                        tempOut: 'Temperatura Media',
                        hiTemp: 'Temperatura Maxima'
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
        this.SelectTimeCurrent(value);
    }

    onSelectTime() {

        console.log(this.SelectTime);
    }

    SelectTimeCurrent(value) {
        switch (value) {
            case 'Lapso de tiempo':
                this.EditDia = false;
                this.EditFecha = true;
                this.EditMonth = false;
                console.log('lapso');
                break;
            case 'Dia':
                this.EditDia = true;
                this.EditFecha = false;
                this.EditMonth = false;
                break;
            case 'Mensual':
                this.EditDia = false;
                this.EditFecha = false;
                this.EditMonth = true;
                break;
            case 'Anual':
                this.EditDia = false;
                this.EditFecha = false;
                this.EditMonth = false;
                break;

        }
    }

    Promedio_Dia(data) {
        data.forEach((num, index) => {

        });
    }

    onChangeVal(ev) {
        let val;
        if (ev.currentTarget.checked) {
            val = ev.target.defaultValue;
            this.CargarChartDinamico(val);
        } else {
            val = ev.target.defaultValue;
            this.CargarChartDinamicoActualizado(val);
        }
    }

    CargarChartDinamicoActualizado(val) {

        console.log('descheckado');
        switch (val) {
            case 'tempOut':
                this.eliminarVariable(val);
                this.createbarC3_Temperature(this.DataTemp, this.TempGroup);
                break;
            case 'hiTemp':
                this.eliminarVariable(val);
                this.createbarC3_Temperature(this.DataTemp, this.TempGroup);
                break;
            case 'lowTemp':
                this.eliminarVariable(val);
                this.createbarC3_Temperature(this.DataTemp, this.TempGroup);
                break;
        }
    }

    CargarChartDinamico(val) {
        switch (val) {
            case 'tempOut':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataTemp, this.TempGroup);
                break;
            case 'hiTemp':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataTemp, this.TempGroup);
                break;
            case 'lowTemp':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataTemp, this.TempGroup);
                break;
        }
    }

    eliminarVariable(val) {
        const index = this.TempGroup.indexOf(val);
        if (index > -1) {
            this.TempGroup.splice(index, 1);
        }
    }


}
