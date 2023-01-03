import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { RouterModule, Routes } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { DirectiveModule } from "../shared/directives/directives.module";
import { CartComponent } from "./cart/cart.component";
import { HomeComponent } from "./home/home.component";
import { ProductComponent } from "./product/product.component";

const routes : Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path:'cart',
    component: CartComponent
  }
]

@NgModule({
  declarations:[HomeComponent, ProductComponent, CartComponent],
  imports:[
    CommonModule,
    MatIconModule,
    MatSnackBarModule,
    NgbModule,
    DirectiveModule,
    RouterModule.forChild(routes)],
  exports:[],
  providers:[]
})
export class ShopModule{}