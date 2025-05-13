import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../auth/login/login.component";
import {ManagerComponent} from "./manager/manager.component";

const routes: Routes = [
  { path: 'manager', component: ManagerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
