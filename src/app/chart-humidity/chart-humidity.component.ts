import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Variables } from '../config/config';
import { AppComponent } from '../app.component';

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
    public EditDiaH = false;
    SelectTime: { [key: string]: any } = {
        option: '1'
    };
    Fdia: any;
    FMes: any;
    Fanio:any;
    DataTemp;
    DataChart = [];
    Labels = [];
    chart;
    TempGroup = [];
    //configuraciones de chart

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
        this.newService.GetVariablesComponentes('02/03/18', 'Dia', Variables.Humidity).subscribe(data => {
            this.DataTemp = data;
            this.cargarFechas(data, 'Dia');
            this.cargarData(data)

        });
    }
    // carga de datos y labels


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
            this.DataChart.push(data[index]['outHum']);
        });
        DataI = [{ data: this.DataChart, label: 'Humedad' }];
        console.log(this.DataChart);
        this.lineChartData = DataI;

    }

    onChangeTime(value) {
        const val = null;
        this.SelectTimeCurrent(value);
    }

    onSelectTime() {
        const option = this.SelectTime.option;
        console.log(this.SelectTime.option);
        this.Fdia = (<HTMLInputElement>document.getElementById('DiaHum')).value;
        this.FMes = (<HTMLInputElement>document.getElementById('MesHum')).value;

        this.crearGrapics(option);
    }

    crearGrapics(option) {
        switch (option) {
            case 'Dia':
                this.newService.GetVariablesComponentes(this.Fdia, option, Variables.Humidity).subscribe(data => {
                    this.DataTemp = data;
                    this.cargarFechas(data, option);
                    this.cargarData(data);

                });
                break;
            case 'Mensual':
                this.newService.GetVariablesComponentes(this.FMes, option, Variables.Humidity).subscribe(data => {
                    this.DataTemp = data;
                    this.cargarFechas(data, option);
                    this.cargarData(data);

                });
                break;
        }
    }

    SelectTimeCurrent(value) {
        switch (value) {
            case 'Lapso de tiempo':
                this.EditFechaH = true;
                this.EditMonthH = false;
                this.EditDiaH = false;
                console.log('lapso');
                break;
            case 'Dia':
                console.log('hoy');
                this.EditFechaH = false;
                this.EditMonthH = false;
                this.EditDiaH = true;
                break;
            case 'Mensual':
                console.log('mensual');
                this.EditFechaH = false;
                this.EditMonthH = true;
                this.EditDiaH = false;
                break;
            case 'Anual':
                console.log('anual');
                this.EditFechaH = false;
                this.EditMonthH = false;
                this.EditDiaH = false;
                break;
        }
    }

}
