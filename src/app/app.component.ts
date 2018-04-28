import {Component, OnInit} from '@angular/core';
import {CommonService} from './common.service';
import * as d3 from 'd3';
import * as c3 from 'c3';
import {JsonFormatter} from 'tslint/lib/formatters';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    constructor(private newService: CommonService) {
    }

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
            this.createbarC3(data);
        });
    }

    createbarC3(data) {

        const chart = c3.generate({
            bindto: '#chart',
            data: {
                json: data,
                keys: {
                    x: 'nombre', // it's possible to specify 'x' when category axis
                    value: ['precio'],
                },
                type: 'bar'
            },
            axis: {
                x: {
                    type: 'category'
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
