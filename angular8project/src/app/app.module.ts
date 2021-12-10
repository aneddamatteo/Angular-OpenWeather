import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import {HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ShowDatabaseComponent } from './show-database/show-database.component';
import { InsertLocationComponent } from './insert-location/insert-location.component';
import { UpdateLocationComponent } from './update-location/update-location.component';
import { DeleteLocationComponent } from './delete-location/delete-location.component';
import { LocationChartsComponent } from './location-charts/location-charts.component';
import {GoogleChartsModule} from "angular-google-charts";

@NgModule({
  declarations: [
    AppComponent,
    WeatherFormComponent,
    ShowDatabaseComponent,
    InsertLocationComponent,
    UpdateLocationComponent,
    DeleteLocationComponent,
    LocationChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule
  ],
  providers: [FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
