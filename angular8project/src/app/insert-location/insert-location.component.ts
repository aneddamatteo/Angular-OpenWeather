import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-insert-location',
  templateUrl: './insert-location.component.html',
  styleUrls: ['./insert-location.component.css']
})
export class InsertLocationComponent implements OnInit {

  insertForm: FormGroup;
  @Input() insertLocationDone;
  message;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.createForm();
  }

  createForm() {
    this.insertForm = this.fb.group({
      location: [''],
      temp: [''],
      humidity: [''],
      wind: [''],
      pressure: ['']
    });
  }

  insertLocationWeather() {
    const location = this.insertForm.controls['location'].value;
    const temp = this.insertForm.controls['temp'].value;
    const humidity = this.insertForm.controls['humidity'].value;
    const wind = this.insertForm.controls['wind'].value;
    const pressure = this.insertForm.controls['pressure'].value;
    const data = {
      "location":location,
      "temp": temp,
      "humidity":humidity,
      "wind":wind,
      "pressure":pressure
    }
    if(temp < -273 || humidity <0 || humidity > 100 || wind < 0 || pressure <= 0) {
      this.message = "Parametri con valori incorretti e locazione non aggiornata";
      this.insertLocationDone = true;

    }
    else{
        this.weatherService.postDataLocation(data).subscribe(
          data => {
            this.message = data['message'];
            this.insertLocationDone = true;

          });
    }
  }
  ngOnInit(): void {
  }

}
