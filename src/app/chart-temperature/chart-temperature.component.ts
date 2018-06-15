import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CommonService} from '../common.service';
import {Variables} from '../config/config';
import * as jspdf from 'jspdf';

import * as d3 from 'd3';
import * as c3 from 'c3';
import {variable} from '@angular/compiler/src/output/output_ast';
import {$} from 'protractor';
import {forEach} from '@angular/router/src/utils/collection';


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
    public DataProm;
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
    Report;
    defaultGrafica = 'spline';

    fechasIn = [];

    chart;
    TempGroup = [];

    constructor(private newService: CommonService, private newServiceProm: CommonService) {

    }


    ngOnInit() {
        this.newServiceProm.GetVariablesProm('08/18').subscribe(data => {
            this.DataProm = data;
            this.cargarFechas(data);
            this.createbarC3_Temperature(data, Variables.default, this.defaultGrafica);
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

    changeGrafica(ev) {
        let val;
        if (ev.currentTarget.checked) {
            val = ev.target.defaultValue;
            this.defaultGrafica = val;
            this.createbarC3_Temperature(this.DataProm, Variables.default, this.defaultGrafica);
        }
    }

    createbarC3_Temperature(data, variableC, grafica) {
        this.chart = c3.generate({
            bindto: '#chartTemperature',
            data: {
                // x: 'x',
                json: data,
                keys: {
                    // x : '_id', // it's possible to specify 'x' when category axis
                    value: variableC
                }, types: {
                    lowTemp: grafica,
                    tempOut: grafica,
                    hiTemp: grafica
                },
                names:
                    {
                        lowTemp: 'Temperatura Mimina',
                        tempOut: 'Temperatura Media',
                        hiTemp: 'Temperatura Maxima'
                    }, type: 'spline'

            }, axis: {
                y: {
                    label: 'Celsius',
                    min: 10
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
            case'Mensual':
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

        const contenido = (<HTMLInputElement>document.getElementById('contenidoM'));
        const margins = {
            top: 10,
            bottom: 10,
            left: 10,
            width: 560
        };

        const specialElementHandlers = {
            '#editor': function (element, renderer) {
                return true;
            },
            '.controls': function (element, renderer) {
                return true;
            }
        };

        const doc = new jspdf('l', 'pt', 'a4');
        doc.fromHTML(contenido, margins.left, // x coord
            margins.top,
            {
                // y coord
                width: margins.width // max width of content on PDF
            },
            function (dispose) {
                // dispose: object with X, Y of the last line add to the PDF
                //          this allow the insertion of new lines after html
                doc.save('Test.pdf');
            },
            margins
        );
    }

    crearGrapics(option) {
        switch (option) {
            case 'Dia':
                this.newService.GetVariablesTemperature(this.Fdia, option).subscribe(data => {
                    this.DataProm = data;
                    // this.cargarFechas(data);
                    this.createbarC3_Temperature(data, Variables.default, this.defaultGrafica);
                });
                break;
            case 'Mensual':
                this.newService.GetVariablesTemperature(this.FMes, option).subscribe(data => {
                    this.DataProm = data;
                    // this.cargarFechas(data);
                    this.createbarC3_Temperature(data, Variables.default, this.defaultGrafica);
                });
                break;
            case 'Anual':
                console.log('año');
                this.newService.GetVariablesTemperature(this.FAnio, option).subscribe(data => {
                    this.DataProm = data;
                    // this.cargarFechas(data);
                    this.createbarC3_Temperature(data, Variables.default, this.defaultGrafica);
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
                this.createbarC3_Temperature(this.DataProm, this.TempGroup, this.defaultGrafica);
                break;
            case 'hiTemp':
                this.eliminarVariable(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup, this.defaultGrafica);
                break;
            case 'lowTemp':
                this.eliminarVariable(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup, this.defaultGrafica);
                break;
        }
    }

    CargarChartDinamico(val) {
        switch (val) {
            case 'tempOut':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup, this.defaultGrafica);
                break;
            case 'hiTemp':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup, this.defaultGrafica);
                break;
            case 'lowTemp':
                this.TempGroup.push(val);
                this.createbarC3_Temperature(this.DataProm, this.TempGroup, this.defaultGrafica);
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
