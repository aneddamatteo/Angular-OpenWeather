import {Component, Input, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";

@Component({
  selector: 'app-show-database',
  templateUrl: './show-database.component.html',
  styleUrls: ['./show-database.component.css']
})
export class ShowDatabaseComponent implements OnInit {

  locations;

  constructor( private weatherService: WeatherService) {
    this.createTable();
  }

  createTable(){
    this.weatherService.getListDb().subscribe( data => {
      this.locations = data;
    });
  }

  ngOnInit(): void {
  }

}
