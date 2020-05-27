import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailComponent} from "./pages/detail/detail.component";


const routes: Routes = [
  {path: ':id', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
