import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeModule} from "./modules/home/home.module";
import {OauthModule} from "./modules/oauth/oauth.module";
import {AuthGuardGuard} from "./auth-guard.guard";
import {Page404Component} from "./components/page404/page404.component";
import {ProductModule} from "./modules/product/product.module";
import {ProvidersModule} from "./modules/providers/providers.module";
import {DepositModule} from "./modules/deposit/deposit.module";
import {UserModule} from "./modules/user/user.module";
import {InventoryModule} from "./modules/inventory/inventory.module";
import {PurchasesModule} from "./modules/purchases/purchases.module";
import {AddOnsModule} from "./modules/add-ons/add-ons.module";
import {SearchModule} from "./modules/search/search.module";


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
    path: 'products',
    loadChildren: () => ProductModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'providers',
    loadChildren: () => ProvidersModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'deposits',
    loadChildren: () => DepositModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'inventory',
    loadChildren: () => InventoryModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'purchase',
    loadChildren: () => PurchasesModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'users',
    loadChildren: () => UserModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'search',
    loadChildren: () => SearchModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'add-ons',
    loadChildren: () => AddOnsModule,
    canActivate: [AuthGuardGuard]
  },
  {
    path: '404',
    component: Page404Component,
    canActivate: [AuthGuardGuard]
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
