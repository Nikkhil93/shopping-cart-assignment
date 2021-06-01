import { Injectable } from "@angular/core";
import { DataService } from "./data-service";

@Injectable({
  providedIn:"root"
})

export class LoginService{
  //ngDocs
  loginDetails() : Promise<any> {
    return DataService.getLoginRequest();
  }
}