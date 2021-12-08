import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.component.html',
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {

  chooseForm;
  @Input() updateLocationChoose;
  @Input() updated;
  updateForm;
  locations;
  choose;
  message;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.getLocation();
    this.createFormRadio();
  }

  getLocation(){
    this.weatherService.getListDb().subscribe( data => {
      this.locations = data;
    })
  }

  createFormRadio() {
    this.chooseForm = this.fb.group({
        choose: ['']
    });
  }

  chooseLocationWeather(){
    this.updateForm = this.fb.group({
      location: [''],
      temp: [''],
      humidity: [''],
      wind: [''],
      pressure: ['']
    });

    this.choose = this.chooseForm.controls['choose'].value;
    this.weatherService.getDbLocation(this.choose).subscribe(
      data => {
        this.updateForm.patchValue({
          temp: data[0]['temp'],
          humidity: data[0]['humidity'],
          wind: data[0]['wind'],
          pressure: data[0]['pressure']
        });
        this.updateLocationChoose = true;
        this.updated =false;
      }
    );

  }
  updateLocationWeather(){
    const temp = this.updateForm.controls['temp'].value;
    const humidity = this.updateForm.controls['humidity'].value;
    const wind = this.updateForm.controls['wind'].value;
    const pressure = this.updateForm.controls['pressure'].value;
    const data = {
      "location":this.choose,
      "temp": temp,
      "humidity":humidity,
      "wind":wind,
      "pressure":pressure
    }
    if(temp < -273 || humidity <0 || humidity > 100 || wind < 0 || pressure <= 0) {
      this.message = "Parametri con valori incorretti e locazione non aggiornata";
      this.updated = true;
    }else{
      this.weatherService.updateLocation(data).subscribe(
        data => {
          this.message = data['message'];
          this.updated = true;
        });
    }
  }

  reload() {
    window.location.reload();
  }

  ngOnInit(): void {
  }

}
