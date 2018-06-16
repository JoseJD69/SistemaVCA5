import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Variables } from '../config/config';

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
    DataChart = [];
    Labels = [];
    public EditFechaP = false;
    public EditMonthP = false;
    public EditDiaP = false;
    SelectTime: { [key: string]: any } = {
        option: '1'
    };
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
        this.newService.GetVariablesComponentes('02/03/18', 'Dia', Variables.Rain).subscribe(data => {
            this.DataRain = data;
             this.cargarFechas(data,'Dia');
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
            this.DataChart.push(data[index]['Rain']);
        });
        DataI = [{ data: this.DataChart, label: 'Precipitación' }];
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

                });
                break;
            case 'Mensual':
                this.newService.GetVariablesComponentes(this.FMes, option, Variables.Rain).subscribe(data => {
                    this.DataRain = data;
                    // this.cargarFechas(data);

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
                this.EditDiaP = true;
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
