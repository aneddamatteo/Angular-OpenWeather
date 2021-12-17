import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WeatherService} from "../weather.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  username
  chooseUpdateForm: FormGroup
  updateUserForm: FormGroup
  @Input() updatedUsername = false;
  @Input() updatePsw = false;
  @Input() updated = false;
  @Input() choosedUpdate = false;
  message
  change
  constructor(private fb: FormBuilder, private weatherService: WeatherService, private cookieService: CookieService, private router:Router) {
    this.getUser();
    this.createChooseForm();
  }

  getUser(){
    this.weatherService.getUsername().subscribe(data =>{
      this.username = data['username'];
    });
  }
  createChooseForm(){
    this.chooseUpdateForm = this.fb.group({
      choose: ['']
    });
  }
  chooseUpdate(){
    this.choosedUpdate = true;
    let value = this.chooseUpdateForm.controls['choose'].value;
    if (value == 0){
      this.updateUserForm = this.fb.group({
        username: [''],
      });
      this.updatePsw = false;
      this.updatedUsername = true;
    }
    else if (value == 1){
      this.updateUserForm = this.fb.group({
        password: [''],
        conf_password: [''],
      });
      this.updatePsw = true;
      this.updatedUsername = false;
    }
    else{
      this.updateUserForm = this.fb.group({
        username: [''],
        password: [''],
        conf_password: [''],
      });
      this.updatePsw = true;
      this.updatedUsername = true;
    }
    this.updated = false;
  }

  updateUser(){
    const data = {
      username: null,
      password: null,
      modifica_usr:false,
      modifica_psw:false
    }

    if (this.updatedUsername){
      data.username =  this.updateUserForm.controls['username'].value;
      data.modifica_usr = true;
    }

    if(this.updatePsw){
      let password = this.updateUserForm.controls['password'].value;
      let conf_password = this.updateUserForm.controls['conf_password'].value;
      if(password == conf_password) {
        data.password = password;
        data.modifica_psw = true;
      }
    }
    console.log(data)

    this.weatherService.updateUser(data).subscribe(data =>{
      this.message = data['message_user']+' e '+ data['message_psw'];
      this.updated = true;
      this.change = data['modified'];
      if (this.change) {
        this.cookieService.delete('jwt');
      }
    });
  }

  refreshData(){
    if(this.change)
      this.router.navigate(['/login']);
    else
      this.reload();
  }

  reload() {
    window.location.reload();
  }
  ngOnInit(): void {
  }

}
