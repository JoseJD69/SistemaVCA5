import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../common.service';
import { Variables } from '../config/config';
import * as jspdf from 'jspdf';

import * as d3 from 'd3';
import * as c3 from 'c3';
import { variable } from '@angular/compiler/src/output/output_ast';
import { $ } from 'protractor';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
    selector: 'app-chart-temperature',
    templateUrl: './chart-temperature.component.html',
    styleUrls: ['./chart-temperature.component.css']
})
export class ChartTemperatureComponent implements OnInit {
    @ViewChild('contenidoM') contenidoM: ElementRef;

    public EditFecha = false;
    public EditMonth = false;
    public EditDia = false;
    public EditYear = false;
    public DataTemp;
    public RMes = '';
    public RDia = '';
    public RAnio = '';
    SelectTime: { [key: string]: any } = {
        option: '1'
    };
    Fdia: any;
    FMes: any;
    FAnio: any;
    FIntervaloInicial: any;
    FIntervaloFinal: any;
    DataChart = [];
    Labels = [];
    Report;
    defaultGrafica = 'spline';

    fechasIn = [];


    TempGroup = [];

    constructor(private newService: CommonService) {

    }

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
        this.newService.GetVariablesTemperature('02/03/17', 'Dia').subscribe(data => {
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
            case 'Intervalo':
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
            this.DataChart.push(data[index]['tempOut']);
        });
        DataI = [{ data: this.DataChart, label: 'Temperatura' }];
        console.log(this.DataChart);
        this.lineChartData = DataI;

    }


    changeGrafica(ev) {
        let val;
        if (ev.currentTarget.checked) {
            val = ev.target.defaultValue;
            this.defaultGrafica = val;
        }
    }

    onChangeTime(value) {
        this.SelectTimeCurrent(value);
    }

    public getMonth(mes) {
        switch (mes) {
            case '01':
                return 'Enero';
            case '02':
                return 'Febrero';
            case '03':
                return 'Marzo';
            case '04':
                return 'Abril';
            case '05':
                return 'Mayo';
            case '06':
                return 'Junio';
            case '07':
                return 'Julio';
            case '08':
                return 'Agosto';
            case '09':
                return 'Septiembre';
            case '10':
                return 'Octubre';
            case '11':
                return 'Noviembre';
            case '12':
                return 'Diciembre';
        }
    }

    onSelectTime() {
        const option = this.SelectTime.option;
        this.Fdia = (<HTMLInputElement>document.getElementById('datepicker')).value;
        this.FMes = (<HTMLInputElement>document.getElementById('datepickerM')).value;
        this.FAnio = (<HTMLInputElement>document.getElementById('datepickerA')).value;
        this.FIntervaloInicial = (<HTMLInputElement>document.getElementById('datepickerA')).value;
        this.FIntervaloFinal = (<HTMLInputElement>document.getElementById('datepickerA')).value;
        let splitted = [];
        let mes = '';
        switch (option) {
            case 'Mensual':
                splitted = this.FMes.toString().split('/', 3);
                mes = splitted[0].toString();
                this.RMes = this.getMonth(mes);
                break;
            case 'Dia':
                splitted = this.Fdia.toString().split('/', 3);
                mes = splitted[1].toString();
                this.RMes = this.getMonth(mes);
                break;
            case 'Anual':
                console.log(option);
                break;

        }


        this.crearGrapics(option);
    }


    downloadPDF() {
        this.newService.getReporte().subscribe(data => {
            this.DataTemp = data;
            console.log(data);
        });

    }

    crearGrapics(option) {
        switch (option) {
            case 'Dia':
                this.newService.GetVariablesTemperature(this.Fdia, option).subscribe(data => {
                    this.DataTemp = data;
                    this.cargarFechas(data, option);
                    this.cargarData(data);
                });
                break;
            case 'Mensual':
                this.newService.GetVariablesTemperature(this.FMes, option).subscribe(data => {
                    this.DataTemp = data;
                    this.cargarFechas(data, option);
                    this.cargarData(data);
                });
                break;
            case 'Anual':
                console.log('año');
                this.newService.GetVariablesTemperature(this.FAnio, option).subscribe(data => {
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
                this.EditDia = false;
                this.EditFecha = true;
                this.EditMonth = false;
                this.EditYear = false;
                console.log('lapso');
                break;
            case 'Dia':
                this.EditDia = true;
                this.EditFecha = false;
                this.EditMonth = false;
                this.EditYear = false;
                break;
            case 'Mensual':
                this.EditDia = false;
                this.EditFecha = false;
                this.EditMonth = true;
                this.EditYear = false;
                break;
            case 'Anual':
                this.EditDia = false;
                this.EditFecha = false;
                this.EditMonth = false;
                this.EditYear = true;
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

                break;
            case 'hiTemp':
                this.eliminarVariable(val);

                break;
            case 'lowTemp':
                this.eliminarVariable(val);

                break;
        }
    }

    CargarChartDinamico(val) {
        switch (val) {
            case 'tempOut':
                this.TempGroup.push(val);

                break;
            case 'hiTemp':
                this.TempGroup.push(val);

                break;
            case 'lowTemp':
                this.TempGroup.push(val);

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
