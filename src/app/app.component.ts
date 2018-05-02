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
    data = [{letter: 'A', frequency: .08167},
        {letter: 'B', frequency: .01492},
        {letter: 'C', frequency: .02782},
        {letter: 'D', frequency: .04253},
        {letter: 'E', frequency: .12702}];
    Repdata;
    valbutton = 'Save';

    ids = [];


    ngOnInit() {
        this.newService.GetProducto().subscribe(data => {
            this.Repdata = data;
            console.log(data);
            //   this.createbarC3(data);
        });
    }

    createbarC3(data, variableC) {
        this.chart = c3.generate({
            bindto: '#chart',
            data: {
                groups: [
                    ['school_latitude']
                ],
                json: data,
                keys: {
                    //   x: '_projectid', // it's possible to specify 'x' when category axis
                    value: variableC
                },

            },
            zoom: {
                enabled: true
            },
            axis: {
                x: {
                    // type: 'category'
                }
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

        if (ev.currentTarget.checked) {
            const val = ev.target.defaultValue;
            console.log('checkado');
            switch (val) {
                case 'school_latitude':
                    this.group.push(val);
                    console.log(this.group);
                    this.createbarC3(this.Repdata, this.group);
                    break;
                case 'total_price_excluding_optional_support':
                    this.group.push(val);
                    this.createbarC3(this.Repdata,this.group);
                    break;


            }
        } else {
            console.log('descheckado');
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
