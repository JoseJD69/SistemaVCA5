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
import {
    MatMenu,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
} from '@angular/material';

import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
    {path: '', redirectTo: '/AnuarioAgroclimatico', pathMatch: 'full'},
    {path: 'AnuarioAgroclimatico', component: InicioComponent},
    {path: 'Portada', component: InicioComponent},

];

@NgModule({
    declarations: [
        AppComponent,
        WindRoseComponent,
        ChartTemperatureComponent,
        ChartRainComponent,
        ChartHumidityComponent,
        ChartSolarRadComponent,
        InicioComponent
    ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule, MatNativeDateModule,
        ReactiveFormsModule,
        BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule,
    ],
    exports: [    // Material
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule],
    providers: [CommonService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
