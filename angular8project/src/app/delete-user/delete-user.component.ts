import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../weather.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  username;
  @Input() deleteUser;
  @Input() eliminate;
  message;

  constructor(private weatherService: WeatherService,private cookieService: CookieService,private router:Router) {
    this.getUser();
  }

  getUser(){
    this.weatherService.getUsername().subscribe(data =>{
      this.username = data['username'];
    });
  }

  deleteAccount(){
    this.deleteUser = true;
    this.eliminate = false;
  }

  deleteUserConfirm(){
    this.weatherService.deleteUser().subscribe(data =>{
      this.message = data['message'];
      this.eliminate=true;
      this.cookieService.delete('jwt');
      this.router.navigate(['/login']);
    });
  }
  deleteUserAbort(){
    this.deleteUser = false;
    this.reload()
  }
  reload() {
    window.location.reload();
  }
  ngOnInit(): void {
  }

}
