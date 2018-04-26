import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) {
    }

    saveProducto(producto) {
        return this.http.post('http://localhost:3000/api/SaveProducto/', {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            mode: producto.mode
        });
    }

    GetProducto() {
        return this.http.get('http://localhost:3000/api/getProducto/');
    }

    deleteProducto(id) {
        return this.http.post('http://localhost:3000/api/deleteProducto/', {'id': id});
    }
}
