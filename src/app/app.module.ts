import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorHandlerComponent } from './shared/error-handler/error-handler.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderModule } from './core/header/header.module';
import { ShopModule } from './shop/shop.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ErrorHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HeaderModule,
    ShopModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
