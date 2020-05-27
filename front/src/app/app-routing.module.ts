import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeModule} from "./modules/home/home.module";
import {OauthModule} from "./modules/oauth/oauth.module";
import {AuthGuardGuard} from "./auth-guard.guard";
import {Page404Component} from "./components/page404/page404.component";
import {ProductModule} from "./modules/product/product.module";


const routes: Routes = [
  {
    path: 'oauth',
    loadChildren: () => OauthModule
  },
  {
    path: 'home',
    loadChildren: () => HomeModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'product',
    loadChildren: () => ProductModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: '404',
    component: Page404Component,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
