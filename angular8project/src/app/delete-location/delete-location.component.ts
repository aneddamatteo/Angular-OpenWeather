import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-delete-location',
  templateUrl: './delete-location.component.html',
  styleUrls: ['./delete-location.component.css']
})
export class DeleteLocationComponent implements OnInit {
  chooseForm: FormGroup;
  locations;
  @Input() deleteLocation;
  @Input() eliminate;
  message;
  choose;

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
    this.choose = this.chooseForm.controls['choose'].value;
    this.deleteLocation = true;
    this.eliminate = false;
  }

  deleteLocationConfirm(){
    const data = {
      "location":this.choose,
    }
    this.weatherService.deleteLocation(data).subscribe(data =>{
      this.message = data['message'];
      this.eliminate=true;
      this.reload();
    });

  }
  deleteLocationAbort(){
    this.deleteLocation = false;
    this.reload()
  }
  reload() {
    window.location.reload();
  }
  ngOnInit(): void {
  }

}
