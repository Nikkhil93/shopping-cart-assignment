import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ErrorHandlerComponent } from './components/error-handler/error-handler.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { CanActivateRouteGuard } from './dal/services/can-activate-route.guard';

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
  path: 'error',
  component: ErrorHandlerComponent,
  canActivate: [CanActivateRouteGuard]
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
