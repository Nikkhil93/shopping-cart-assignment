import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { HeaderModule } from './components/header/header.module';
import { DropdownDirective } from './dal/directives/dropdown.directive';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
    DropdownDirective,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    HeaderModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
