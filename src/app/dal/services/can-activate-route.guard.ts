import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { DataService } from "./data-service";

@Injectable({providedIn: 'root'})

export class CanActivateRouteGuard implements CanActivate{
  constructor(private router: Router) {}
  canActivate(): boolean{
    if(!DataService.errorOccured) this.router.navigate(['/home'])
    return DataService.errorOccured;
  }
}