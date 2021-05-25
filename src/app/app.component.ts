import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUrl = '';
  private _isComponentActive = true;
  totalCartItems: number;

  constructor(private router: Router) { }

  ngOnInit() {
    // demonstrating the use of takeWhile to unsubscribe
    this.router.events.pipe(takeWhile(() => this._isComponentActive), filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => { 
        this.currentUrl = event.url;
      })
  }

  ngOnDestroy() {
    this._isComponentActive = false;
  }
}
