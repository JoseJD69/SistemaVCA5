import {Component, OnInit} from '@angular/core';
import {CommonService} from './common.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    constructor(private newService: CommonService) {
    }

    Repdata;
    valbutton = 'Save';


    ngOnInit() {
        this.newService.GetProducto().subscribe(data => this.Repdata = data);
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
