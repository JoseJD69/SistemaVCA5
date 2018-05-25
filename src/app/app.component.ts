import {Component, OnInit} from '@angular/core';
import {CommonService} from './common.service';
import * as d3 from 'd3';
import * as c3 from 'c3';
import {JsonFormatter} from 'tslint/lib/formatters';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {variable} from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    constructor(private newService: CommonService) {
    }

    chart;
    group = [];
    nombresX = [];
    Repdata;
    fechasIn = [];
    varibledafault = ['lowTemp'];
    valbutton = 'Save';
    promedioTemp = [];

    ids = [];


    ngOnInit() {
        this.newService.GetProducto().subscribe(data => {
            this.Repdata = data;
            console.log(data);
            this.cargarFechas(data);
            this.createbarC3(data, this.varibledafault);
        });
    }

    cargarFechas(data) {
        data.forEach((num, index) => {
            this.fechasIn.push(data[index]['Date']);
        });
        console.log(this.fechasIn);
    }
//probando recien
    promedioFechaTemp(data, fechaIn, fechaFin) {
        let suma = 0;
        data.forEach((num, index) => {
            if (data[index]['Date'] === fechaIn) {
                suma += data[index]['tempOut'];
            }
        });
        const promedio = (suma / data.length());
    }

    createbarC3(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chart',
            data: {
                json: data,
                keys: {
                    //  x: '_id', // it's possible to specify 'x' when category axis
                    value: variableC
                },
                names:
                    {
                        lowTemp: 'Temperatura Mimina',
                        tempOut: 'Temperatura Media',
                        hiTemp: 'Temperatura Maxima',
                        outHum: 'Humedad Relativa'
                    }, type: 'spline'

            }, axis: {
                x: {
                    type: 'category',
                    categories: this.fechasIn,
                    tick: {
                        rotate: 75,
                        multiline: false
                    },
                    height: 130
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

    onSave = function (producto, isValid: boolean) {
        producto.mode = this.valbutton;
        this.newService.saveProducto(producto)
            .subscribe(data => {
                    alert(data.data);

                    this.ngOnInit();
                }
                , error => this.errorMessage = error);

    };

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
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'hiTemp':
                this.eliminarVariable(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'lowTemp':
                this.eliminarVariable(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'outHum':
                this.eliminarVariable(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'windSpeed':
                this.eliminarVariable(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'windDir':
                this.eliminarVariable(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'SolarRad':
                this.eliminarVariable(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'uvIndex':
                this.eliminarVariable(val);
                this.createbarC3(this.Repdata, this.group);
                break;
        }
    }

    CargarChartDinamico(val) {
        switch (val) {
            case 'tempOut':
                this.group.push(val);
                this.nombresX.push();
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'hiTemp':
                this.group.push(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'lowTemp':
                this.group.push(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'outHum':
                this.group.push(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'windSpeed':
                this.group.push(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'windDir':
                this.group.push(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'SolarRad':
                this.group.push(val);
                this.createbarC3(this.Repdata, this.group);
                break;
            case 'uvIndex':
                this.group.push(val);
                this.createbarC3(this.Repdata, this.group);
                break;
        }
    }

    eliminarVariable(val) {
        const index = this.group.indexOf(val);
        if (index > -1) {
            this.group.splice(index, 1);
        }
    }

    edit = function (product) {
        this.id = product._id;
        this.nombre = product.nombre;
        this.precio = product.precio;
        this.valbutton = 'Update';
    };

    delete = function (id) {
        this.newService.deleteProducto(id)
            .subscribe(data => {
                alert(data.data);
                this.ngOnInit();
            }, error => this.errorMessage = error);
    };
}
