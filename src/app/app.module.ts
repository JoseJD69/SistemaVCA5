import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {CommonService} from './common.service';
import {WindRoseComponent} from './wind-rose/wind-rose.component';
import {ChartTemperatureComponent} from './chart-temperature/chart-temperature.component';
import {ChartRainComponent} from './chart-rain/chart-rain.component';
import {ChartHumidityComponent} from './chart-humidity/chart-humidity.component';
import {ChartSolarRadComponent} from './chart-solar-rad/chart-solar-rad.component';
import {Routes, RouterModule} from '@angular/router';
import {InicioComponent} from './inicio/inicio.component';
import {CdkTableModule} from '@angular/cdk/table';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReportViewComponent } from './report-view/report-view.component';
import { PortadaComponent } from './portada/portada.component';
import { PruebaChartJsComponent } from './prueba-chart-js/prueba-chart-js.component';
import { ChartsModule } from 'ng2-charts';
import 'hammerjs';
import 'chartjs-plugin-zoom';

const appRoutes: Routes = [
    {path: '', redirectTo: '/AnuarioAgroclimatico', pathMatch: 'full'},
    {path: 'AnuarioAgroclimatico', component: InicioComponent},
    {path: 'Portada', component: PortadaComponent},
    {path: 'ReportView', component: ReportViewComponent},
    {path: 'ChartView', component: PruebaChartJsComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        WindRoseComponent,
        ChartTemperatureComponent,
        ChartRainComponent,
        ChartHumidityComponent,
        ChartSolarRadComponent,
        InicioComponent,
        ReportViewComponent,
        PortadaComponent,
        PruebaChartJsComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, ChartsModule
    ],

    providers: [CommonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
