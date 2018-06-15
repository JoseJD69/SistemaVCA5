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
    Labels = [];
    DataChart = [];
    chart;
    TempGroup = [];


// configuraciones chart
    public lineChartData = [
        {
            data: this.DataChart, label: 'Radiacion'
        }
    ];
    public lineChartLabels: Array<any> = this.Labels;
    public lineChartOptions: any = {
        responsive: true,
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }],
            yAxes: [{
                gridLines: {
                    drawOnChartArea: false
                }
            }]
        },
        pan: {
            enabled: true,
            mode: 'x',
        },
        zoom: {
            enabled: true,
            mode: 'x',
        }
    };
    public lineChartLegend: Boolean = true;
    public lineChartType: String = 'line';

    public lineChartColors: Array<any> = [
        { // Azul
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(54, 162, 235,0.8)',
            pointBackgroundColor: 'rgba(54, 162, 235,0.8)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,255,255,0.2)'
        },
        { // Verde
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(0,204,102,0.8)',
            pointBackgroundColor: 'rgba(0,204,102,0.8)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,255,255,0.2)'
        },
        { // Rojo
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderColor: 'rgba(255,26,26,0.7)',
            pointBackgroundColor: 'rgba(255,26,26,0.7)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,255,255,0.2)'
        }
    ];


    ngOnInit() {
        this.newService.GetVariablesComponentes('02/03/18', 'Dia', Variables.SolarRad).subscribe(data => {
            this.DataTemp = data;
            this.cargarFechas(data, 'Dia');
            this.cargarData(data);
        });

    }

    cargarFechas(data, option) {
        while (this.Labels.length > 0) {
            this.Labels.pop();
        }
        switch (option) {
            case 'Dia':
                data.forEach((num, index) => {
                    this.Labels.push(data[index]['Time']);
                });
                console.log(this.Labels);
                break;
            case 'Mensual':
                data.forEach((num, index) => {
                    this.Labels.push(data[index]['_id']);
                });

                break;
            case'Intervalo':
                data.forEach((num, index) => {
                    this.Labels.push(data[index]['_id']);
                });
                break;
        }

    }

    cargarData(data) {
        let DataI = [];
        this.DataChart = [];
        data.forEach((num, index) => {
            this.DataChart.push(data[index]['SolarRad']);
        });
        DataI = [{data: this.DataChart, label: 'Radiacion'}];
        console.log(this.DataChart);
        this.lineChartData = DataI;

    }

    createbarC3_SolarRad(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartRadiacion',
            data: {
                json: data,
                keys: {
                    x: 'Time', // it's possible to specify 'x' when category axis
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
                x: {
                    type: 'category',
                    tick: {
                        rotate: 75,
                        multiline: false
                    },
                    height: 80
                },
                y:
                    {
                        label: 'W/m2'
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
        this.Fdia = (<HTMLInputElement>document.getElementById('SolarDia')).value;
        this.FMes = (<HTMLInputElement>document.getElementById('SolarMes')).value;
        this.crearGrapics(option);
    }

    crearGrapics(option) {
        switch (option) {
            case 'Dia':
                this.newService.GetVariablesComponentes(this.Fdia, option, Variables.SolarRad).subscribe(data => {
                    this.DataTemp = data;
                    console.log(data);
                    console.log(this.Fdia);
                    console.log(option);
                    this.cargarFechas(data, option);
                    this.cargarData(data);
                });
                break;
            case 'Mensual':
                this.newService.GetVariablesComponentes(this.FMes, option, Variables.SolarRad).subscribe(data => {
                    this.DataTemp = data;
                    console.log(data);
                    console.log(this.FMes);
                    console.log(option);
                    this.cargarFechas(data, option);
                    this.cargarData(data);
                });
                break;
            case 'Intervalo':
                this.newService.GetVariablesComponentes(this.FMes, option, Variables.SolarRad).subscribe(data => {
                    this.DataTemp = data;
                    this.cargarFechas(data, option);
                    this.cargarData(data);
                });
                break;
        }
    }

    SelectTimeCurrent(value) {
        switch (value) {
            case 'Intervalo':
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
