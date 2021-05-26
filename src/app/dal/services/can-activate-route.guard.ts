import { Injectable } from "@angular/core";
import { 
  ActivatedRouteSnapshot, 
  CanActivate,
  Router, 
  RouterStateSnapshot, 
  UrlTree 
} from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "./data-service";

@Injectable({providedIn: 'root'})

export class CanActivateRouteGuard implements CanActivate{
  constructor(private router: Router) {}
  canActivate(
    route:ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
    return !DataService.errorOccured ? this.router.createUrlTree(['/home']) : DataService.errorOccured;
  }
}