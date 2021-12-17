import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WeatherFormComponent} from "./weather-form/weather-form.component";
import {ShowDatabaseComponent} from "./show-database/show-database.component";
import {InsertLocationComponent} from "./insert-location/insert-location.component";
import {UpdateLocationComponent} from "./update-location/update-location.component";
import {DeleteLocationComponent} from "./delete-location/delete-location.component";
import {LocationChartsComponent} from "./location-charts/location-charts.component";
import {LoginUserComponent} from "./login-user/login-user.component";
import {DeleteUserComponent} from "./delete-user/delete-user.component";
import {UpdateUserComponent} from "./update-user/update-user.component";
import {RegistraUserComponent} from "./registra-user/registra-user.component";
import {LoginControllerService} from "./login-controller.service";

const routes: Routes = [
  {
    path: '',
    component: WeatherFormComponent,
    canActivate : []
  },
  {
    path: 'showDb',
    component: ShowDatabaseComponent,
    canActivate : []
  },
  {
    path: 'insertLocation',
    component: InsertLocationComponent,
    canActivate : []
  },
  {
    path: 'updateLocation',
    component: UpdateLocationComponent,
    canActivate : []
  },
  {
    path: 'deleteLocation',
    component: DeleteLocationComponent,
    canActivate : []
  },
  {
    path: 'locationCharts',
    component: LocationChartsComponent,
    canActivate : []
  },
  {
    path: 'login',
    component: LoginUserComponent,
    canActivate : [LoginControllerService]
  },
  {
    path: 'deleteUser',
    component: DeleteUserComponent,
    canActivate : []
  },
  {
    path: 'updateUser',
    component: UpdateUserComponent,
    canActivate : []
  },
  {
    path: 'registraUser',
    component: RegistraUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
