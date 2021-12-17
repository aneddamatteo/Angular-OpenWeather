import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../weather.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registra-user',
  templateUrl: './registra-user.component.html',
  styleUrls: ['./registra-user.component.css']
})
export class RegistraUserComponent implements OnInit {

  registraForm: FormGroup;
  @Input() messageRegistrato;
  message;

  constructor(private fb: FormBuilder, private weatherService: WeatherService, private cookieService: CookieService, private router:Router) {
    this.getLogInForm();
  }

  getLogInForm(){
    this.registraForm = this.fb.group({
      username: [''],
      password: ['']

    });
  }
  registra(){
    const username = this.registraForm.controls['username'].value;
    const psw = this.registraForm.controls['password'].value;
    const data = {
      username:username,
      password:psw
    }
    this.weatherService.registraUser(data).subscribe(data =>{
      if(data['success']){
        this.messageRegistrato = false;
        this.message = data['message'];
        this.router.navigate(['/login']);
      }
      else{
        this.messageRegistrato = true;
        this.message = data['message'];
      }
    });
  }
  ngOnInit(): void {
  }

}
