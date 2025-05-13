import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {FormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    ManagerComponent,
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
