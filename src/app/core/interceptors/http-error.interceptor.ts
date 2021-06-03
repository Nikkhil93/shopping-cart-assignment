import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from '../services/data-service';
import { SpinnerDisplayService } from '../services/spinner-display.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private spinnerDisplayService: SpinnerDisplayService, private router : Router){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    this.spinnerDisplayService.showSpinner$.next(true);

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          DataService.errorOccured= true;
          this.spinnerDisplayService.showSpinner$.next(false);
          this.router.navigate(['/error']);
          return throwError(error.statusText);
        })
      )
  }
}