import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddComponent} from "./pages/add/add.component";
import {ListComponent} from "./pages/list/list.component";


const routes: Routes = [
  {path: '', component: ListComponent},
  {path: ':id', component: AddComponent},
  {
    path: 'new', component: AddComponent,
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepositRoutingModule { }
