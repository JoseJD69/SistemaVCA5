import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {Variables} from '../config/config';
import {AppComponent} from '../app.component';
import {MatMenuModule} from '@angular/material/menu';


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
    Fdia: any;
    FMes: any;
    DataTemp;
    DataProm;
    fechasIn = [];

    chart;
    TempGroup = [];

    constructor(private newService: CommonService, private newServiceProm: CommonService) {

    }


    ngOnInit() {
        this.newServiceProm.GetVariablesProm('08/18').subscribe(data => {
            this.DataProm = data;
            this.cargarFechas(data);
            this.createbarC3_Temperature(data, Variables.default);
        });
    }

    dataChanged(event) {
        console.log(event);
    }

    cargarFechas(data) {
        data.forEach((num, index) => {
            this.fechasIn.push(data[index]['_id']);
        });
    }

    createbarC3_Temperature(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartTemperature',
            data: {
                // x: 'x',
                json: data,
                keys: {
                    // x : '_id', // it's possible to specify 'x' when category axis
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

            }, axis: {
                y: {
                    label: 'Celsius'
                }
                /* x: {
                     type: 'category',
                     categories: this.fechasIn,
                     tick: {
                         rotate: 75,
                         multiline: false
                     },
                     height: 80
                 }*/
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
                this.newService.GetVariablesFechas(this.Fdia, option).subscribe(data => {
                    this.DataProm = data;
                    // this.cargarFechas(data);
                    this.createbarC3_Temperature(data, Variables.default);
                });
                break;
            case 'Mensual':
                this.newService.GetVariablesFechas(this.FMes, option).subscribe(data => {
                    this.DataProm = data;
                    // this.cargarFechas(data);
                    this.createbarC3_Temperature(data, Variables.default);
                });
                break;
        }
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
                this.createbarC3_Temperature(this.DataProm, this.TempGroup);
                break;
            case 'hiTemp':
                this.eliminarVariable(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup);
                break;
            case 'lowTemp':
                this.eliminarVariable(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup);
                break;
        }
    }

    CargarChartDinamico(val) {
        switch (val) {
            case 'tempOut':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup);
                break;
            case 'hiTemp':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup);
                break;
            case 'lowTemp':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup);
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
