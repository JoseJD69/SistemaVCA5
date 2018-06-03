import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';

import {CommonService} from './common.service';
import { WindRoseComponent } from './wind-rose/wind-rose.component';
import { ChartTemperatureComponent } from './chart-temperature/chart-temperature.component';
import { ChartRainComponent } from './chart-rain/chart-rain.component';
import { ChartHumidityComponent } from './chart-humidity/chart-humidity.component';
import { ChartSolarRadComponent } from './chart-solar-rad/chart-solar-rad.component';



@NgModule({
    declarations: [
        AppComponent,
        WindRoseComponent,
        ChartTemperatureComponent,
        ChartRainComponent,
        ChartHumidityComponent,
        ChartSolarRadComponent
    ],
    imports: [
        BrowserModule, HttpClientModule, FormsModule,
    ],
    providers: [CommonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
