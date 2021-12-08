import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherFormComponent} from "./weather-form/weather-form.component";
import {ShowDatabaseComponent} from "./show-database/show-database.component";
import {InsertLocationComponent} from "./insert-location/insert-location.component";
import {UpdateLocationComponent} from "./update-location/update-location.component";
import {DeleteLocationComponent} from "./delete-location/delete-location.component";

const routes: Routes = [
  {
    path: '',
    component: WeatherFormComponent
  },
  {
    path: 'showDb',
    component: ShowDatabaseComponent
  },
  {
    path: 'insertLocation',
    component: InsertLocationComponent
  },
  {
    path: 'updateLocation',
    component: UpdateLocationComponent
  },
  {
    path: 'deleteLocation',
    component: DeleteLocationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }