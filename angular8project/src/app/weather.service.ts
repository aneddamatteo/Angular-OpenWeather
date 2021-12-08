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
    return this.http.get(this.uri + 'weather/' + city);
  }
  getDbLocation(city: string){
    return this.http.get(this.uri + 'dbLocation/'+ city);
  }
  getListDb(){
    return this.http.get(this.uri + 'storedLocation');
  }
  postDataLocation(data: object){
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.post(this.uri + 'insertLocation', JSON.stringify(data), options);
  }
  updateLocation(data: object){
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.http.put(this.uri + 'updateLocation', JSON.stringify(data), options);
  }

  deleteLocation(data){
    const options = {headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)};
    return this.http.delete(this.uri + 'deleteLocation', options);
  }
}
