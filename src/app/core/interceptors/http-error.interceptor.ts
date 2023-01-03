import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpEventType
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DataService } from '../services/data-service';
import { SpinnerDisplayService } from '../services/spinner-display.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private timer;
  constructor(private spinnerDisplayService: SpinnerDisplayService, private router : Router){}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.timer){ clearTimeout(this.timer); }
    this.timer = setTimeout(() => this.spinnerDisplayService.showSpinner$.next(true), 100);

    return next.handle(request)
    .pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) {
        clearTimeout(this.timer);
        this.spinnerDisplayService.showSpinner$.next(false);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        DataService.errorOccured= true;
        this.spinnerDisplayService.showSpinner$.next(false);
        this.router.navigate(['/error']);
        return throwError(error.statusText);
      })
    )
  }
}
