import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {

    constructor(private http: HttpClient) {
    }

    params = new HttpParams();

    saveProducto(producto) {
        return this.http.post('http://localhost:3000/api/SaveProducto/', {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            mode: producto.mode
        });
    }

    GetProducto() {
        return this.http.get('http://localhost:3000/api/getVariables/');
    }

    GetVariablesFechas(fecha, tipo) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('fecha', fecha);
        httpParams = httpParams.append('tipo', tipo);
        return this.http.get('http://localhost:3000/api/getVariables/', {params: httpParams});
    }
    GetVariablesComponentes(fecha, tipo,variableC) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('fecha', fecha);
        httpParams = httpParams.append('tipo', tipo);
        httpParams = httpParams.append('variableC', variableC);
        return this.http.get('http://localhost:3000/api/getVariablesComponentes/', {params: httpParams});
    }

    GetVariablesProm(fecha) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('fecha', fecha);
        return this.http.get('http://localhost:3000/api/getVariablesDia', {params: httpParams});
    }

    deleteProducto(id) {
        return this.http.post('http://localhost:3000/api/deleteProducto/', {'id': id});
    }
}
