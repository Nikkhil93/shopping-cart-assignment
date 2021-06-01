import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs/operators';
import { SpinnerDisplayService } from './core/services/spinner-display.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,OnDestroy{
  currentUrl = '';
  private _isComponentActive = true;
  totalCartItems: number;
  isLoading: boolean;

  constructor(
    private router: Router,
    private spinnerDisplayService: SpinnerDisplayService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // demonstrating the use of takeWhile to unsubscribe
    this.router.events.pipe(takeWhile(() => this._isComponentActive), filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => { 
      this.currentUrl = event.url;
    });
    this.spinnerDisplayService.showSpinner$.pipe(takeWhile(() => this._isComponentActive))
    .subscribe((res)=>{
      this.isLoading = res;
      this.ref.detectChanges();
    })
  }

  ngOnDestroy() {
    this._isComponentActive = false;
  }
}
