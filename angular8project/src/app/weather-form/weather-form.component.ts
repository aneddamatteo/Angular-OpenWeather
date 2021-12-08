import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {WeatherService} from '../weather.service';


@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.css']
})
export class WeatherFormComponent implements OnInit {

  angForm: FormGroup;
  @Input() isWeatherReady;
  weather;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      city: [''],
    });
  }
  getWeather() {
    const city = this.angForm.controls['city'].value;
    this.weatherService.getWeather(city).subscribe(
      data => {
        this.weather = data;
        this.isWeatherReady = true;
      }
    );
  }

  ngOnInit(): void {
  }

}
