import {Component, OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import {Variables} from '../config/config';


@Component({
    selector: 'app-prueba-chart-js',
    templateUrl: './prueba-chart-js.component.html',
    styleUrls: ['./prueba-chart-js.component.css']
})
export class PruebaChartJsComponent implements OnInit {
    DataProm;
    chart: any;
    fechasIn = [];
    DataIn = [];

    constructor(private newService: CommonService) {
    }

// configuraciones chart
    public lineChartData: Array<any> = [
        {data: this.DataIn, label: 'Temperatura'}
    ];
    public lineChartLabels: Array<any> = this.fechasIn;
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
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    ngOnInit() {
        this.newService.GetVariablesTemperature('03/18', 'Mensual').subscribe(data => {
            this.DataProm = data;
            this.cargarFechas(data);
            this.cargarData(data);
        });


    }

    cargarFechas(data) {
        data.forEach((num, index) => {
            this.fechasIn.push(data[index]['_id']);
        });
        console.log(this.fechasIn);
    }

    cargarData(data) {
        data.forEach((num, index) => {
            this.DataIn.push(data[index]['tempOut']);
        });
        console.log(this.DataIn);
    }

}
