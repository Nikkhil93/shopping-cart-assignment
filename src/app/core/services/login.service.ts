import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export interface loginDetails {
  email:string,
  password: string
}

@Injectable({
  providedIn:"root"
})

export class LoginService{

  private url: string = environment.apiUrl;
  constructor(private http:HttpClient){}
  //makes an http request to fetch all the user email and password.
  loginDetails() : Observable<loginDetails[]> {
    return this.http.get<loginDetails[]>(`${this.url}login`)
  }
}
