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
    varibledafaultTemp = ['lowTemp'];
    varibledafaultHum = ['outHum'];
    varibledafaultRad = ['SolarRad'];
    valbutton = 'Save';
    promedioTemp = [];

    ids = [];


    ngOnInit() {
        this.newService.GetVariablesFechas().subscribe(data => {
            this.Repdata = data;

            this.cargarFechas(data);
            this.createbarC3_Humedad(data, this.varibledafaultHum);
            this.createbarC3_Rad(data, this.varibledafaultRad);
        });
    }

    cargarFechas(data) {
        data.forEach((num, index) => {
            this.fechasIn.push(data[index]['Date']);
        });
    }

// probando recien
    /* promedioFechaTemp(data) {
         let suma = 0;
         data.forEach((num, index) => {
             if (data[index] ===) {
                 suma += data[index]['tempOut'];
             }
         });
         const promedio = (suma / data.length());
     }*/


    createbarC3_Humedad(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartHumedad',
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

    createbarC3_Rad(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chartRadiacion',
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

    onSave = function (producto, isValid: boolean) {
        producto.mode = this.valbutton;
        this.newService.saveProducto(producto)
            .subscribe(data => {
                    alert(data.data);

                    this.ngOnInit();
                }
                , error => this.errorMessage = error);

    };

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
