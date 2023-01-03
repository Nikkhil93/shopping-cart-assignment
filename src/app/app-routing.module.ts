import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateRouteGuard } from './core/services/can-activate-route.guard';
import { ErrorHandlerComponent } from './shared/error-handler/error-handler.component';

const routes: Routes = [{
  path: '/',
  loadChildren:() => import('./shop/shop.module').then(m => m.ShopModule)
},
{
  path: 'auth',
  loadChildren: () => import('./core/authentication/authentication.module').then(m => m.AuthenticationModule)
},
{
  path: 'error',
  component: ErrorHandlerComponent,
  canActivate: [CanActivateRouteGuard]
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
