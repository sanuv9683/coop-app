import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../auth/login/login.component";
import {ManagerComponent} from "./manager/manager.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";

const routes: Routes = [
  { path: 'manager', component: ManagerComponent },
  { path: 'leaderboard', component: LeaderboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
