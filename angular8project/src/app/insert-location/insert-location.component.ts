import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-insert-location',
  templateUrl: './insert-location.component.html',
  styleUrls: ['./insert-location.component.css']
})
export class InsertLocationComponent implements OnInit {

  insertForm;
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
    this.weatherService.postDataLocation(data).subscribe(
      data => {
        this.message = data['message'];
        this.insertLocationDone = true;
      }
    );
  }
  ngOnInit(): void {
  }

}
