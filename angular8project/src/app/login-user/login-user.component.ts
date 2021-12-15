import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../weather.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  logInForm: FormGroup;
  @Input() messageLogin;
  message;

  constructor(private fb: FormBuilder, private weatherService: WeatherService, private cookieService: CookieService, private router:Router) {
    this.getLogInForm();
  }

  getLogInForm(){
    this.logInForm = this.fb.group({
      username: [''],
      password: ['']

    });
  }
  logIn(){
    const username = this.logInForm.controls['username'].value;
    const psw = this.logInForm.controls['password'].value;
    // criptare password
    const data = {
      username:username,
      password:psw
    }

    this.weatherService.postLogIn(data).subscribe(data =>{
      if(data['success']){
        console.log(data)
        this.messageLogin = false;
        this.message = data['message'];
        this.cookieService.set("jwt",data["token"]);
        this.router.navigate(['']);
      }
      else{
        this.messageLogin = true;
        this.message = data['message'];
      }
    });
  }
  ngOnInit(): void {
  }

}
