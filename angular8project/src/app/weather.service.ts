import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  uri = 'http://localhost:8000/';
  constructor(private http: HttpClient) {
  }
  getWeather(city: string) {
    const options = {withCredentials: true};
    return this.http.get(this.uri + 'weather/' + city,options);
  }
  getDbLocation(city: string){
    const options = {withCredentials: true};
    return this.http.get(this.uri + 'dbLocation/'+ city,options);
  }
  getListDb(){
    const options = {withCredentials: true};
    return this.http.get(this.uri + 'storedLocation',options);
  }
  postDataLocation(data: object){
    const options = {headers: {'Content-Type': 'application/json'},withCredentials: true};
    return this.http.post(this.uri + 'insertLocation', JSON.stringify(data), options);
  }
  updateLocation(data: object){
    const options = {headers: {'Content-Type': 'application/json'},withCredentials: true};
    return this.http.put(this.uri + 'updateLocation', JSON.stringify(data), options);
  }
  deleteLocation(data: object){
    const options = {headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data),withCredentials: true};
    return this.http.delete(this.uri + 'deleteLocation', options);
  }
  postLogIn(data: object){
    const options = {headers: {'Content-Type': 'application/json' }};
    return this.http.post(this.uri + 'login', JSON.stringify(data), options);
  }
  getUsername(){
    return this.http.get(this.uri + 'utente', {withCredentials:true});
  }
  deleteUser(){
    return this.http.delete(this.uri +'deleteUser', {withCredentials:true});
  }
  updateUser(data: object){
    const options = {headers: {'Content-Type': 'application/json'},withCredentials: true};
    return this.http.put(this.uri+ 'updateUser',JSON.stringify(data), options);
  }
  registraUser(data: object){
    const options = {headers: {'Content-Type': 'application/json' }};
    return this.http.post(this.uri + 'registrazione', JSON.stringify(data), options);
  }
}
