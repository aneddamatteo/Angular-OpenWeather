import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../weather.service";
import {GoogleChartsModule} from "angular-google-charts";

@Component({
  selector: 'app-location-charts',
  templateUrl: './location-charts.component.html',
  styleUrls: ['./location-charts.component.css']
})
export class LocationChartsComponent implements OnInit {

  chooseForm: FormGroup;
  @Input() showCharts;
  locations;
  choose;
  lineChart;
  histogramChart;
  windChart;

  constructor(private fb: FormBuilder, private weatherService: WeatherService, private gc: GoogleChartsModule) {
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
    this.weatherService.getDbLocation(this.choose).subscribe(
      data => {
        let temp = data[0]['temp'];
        let humidity= data[0]['humidity'];
        let wind= data[0]['wind'];
        let pressure= data[0]['pressure'];
        let timestamp = data[0]['timestamp_refresh'];
        this.createLineChart(pressure, timestamp,this.choose);
        this.createHistogramChart(temp,humidity,this.choose,timestamp);
        this.createWindChart(wind,timestamp,this.choose);
        this.showCharts = true;
      }
    );
  }
  createLineChart(pressure, timestamp,city){
    let data : Array<number> [] = [];
    for (let x in pressure) {
      let a = new Date(timestamp[x]).toDateString();
      let b = pressure[x];
      data.push([a,b]);
    }
    this.lineChart =
    {
      title :'Storico della pressione rilevata in ' + city,
      type : 'LineChart',
      data : data,
      columnNames : ["Data", "Pressione"],
      options : {
        hAxis: {
          title: 'Data'
        },
        vAxis: {
          title: 'Pressione'
        },
        is3D:true
      },
      width : 550,
      height : 400,
    }
  }

  createHistogramChart(temp,humidity,city,timestamp){
    let histDate =  new Date(timestamp[timestamp.length-1]);
    this.histogramChart =
      {
        title :'Temperatura e umidità a ' + city,
        type : "ColumnChart",
        data :[[histDate.toDateString(),temp[temp.length-1],humidity[humidity.length-1]]],
        columnNames : ["Tempo","Temperatura", "Umidità"],
        options : {
          hAxis: {
            title: 'Timestamp'
          },
          vAxis: {
            title: 'Value'
          },
          legend: 'none',
          is3D:true
        },
        width : 550,
        height : 400,
      }
  }

  createWindChart(wind,timestamp,city){
    let data : Array<number> [] = [];
    for (let x in wind) {
      let a = new Date(timestamp[x]).toDateString();
      let b = wind[x];
      data.push([a,b]);
    }
    this.windChart = {
        title :'Storico intensità del vento a ' + city,
        type : 'BarChart',
        data : data,
        columnNames : ["Tempo","Vento"],
        options : { is3D:true},
        width : 550,
        height : 400,
    }
  }
  ngOnInit(): void {
  }

}
