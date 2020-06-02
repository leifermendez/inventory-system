import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailComponent} from "./pages/detail/detail.component";
import {ListComponent} from "./pages/list/list.component";


const routes: Routes = [
  {path: '', component: ListComponent},
  {path: ':id', component: DetailComponent},
  {
    path: 'add', component: DetailComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
