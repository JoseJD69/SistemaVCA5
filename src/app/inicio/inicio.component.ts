import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    public Temperatura = false;
    public Humedad = false;
    public Radiacion = false;
    public Precipitacion = false;

    getGrafica(value) {
        switch (value) {
            case'Temperatura':
                this.Temperatura = true;
                this.Humedad = false;
                this.Radiacion = false;
                this.Precipitacion = false;
                break;
            case'Humedad':
                this.Temperatura = false;
                this.Humedad = true;
                this.Radiacion = false;
                this.Precipitacion = false;
                break;
            case'Radiacion':
                this.Temperatura = false;
                this.Humedad = false;
                this.Radiacion = true;
                this.Precipitacion = false;
                break;
            case'Precipitacion':
                this.Temperatura = false;
                this.Humedad = false;
                this.Radiacion = false;
                this.Precipitacion = true;
                break;

        }
    }
}
