import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../auth/login/login.component";
import {ManagerComponent} from "./manager/manager.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";
import {authGuard} from "../guards/auth.guard";

const routes: Routes = [
  { path: 'manager', component: ManagerComponent ,canActivate:[authGuard]},
  { path: 'leaderboard', component: LeaderboardComponent,canActivate:[authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
