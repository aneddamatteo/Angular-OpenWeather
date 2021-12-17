import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginControllerService implements CanActivate{

  constructor(private http: HttpClient, private cookieService: CookieService, private route:Router) { }

  canActivate() {
    const options = {withCredentials: true};
    let result = this.http.get('http://localhost:8000/',options);
    result.subscribe(data =>{
      console.log(data)
    })
    //this.route.navigate(['']);
    return true;
  }
}
