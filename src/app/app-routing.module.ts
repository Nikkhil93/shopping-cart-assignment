import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'product',
  component: ProductComponent,
},
{
  path: 'auth',
  loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
},

{
  path: 'cart',
  component: CartComponent
},
{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo:'home'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
