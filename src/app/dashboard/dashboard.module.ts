import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import {FormsModule} from "@angular/forms";
import {NgChartsModule} from "ng2-charts";
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { CollegeComponent } from './college/college.component';
import { SalesComponent } from './sales/sales.component';
import { EmployeeSalesComponent } from './employee-sales/employee-sales.component';


@NgModule({
  declarations: [
    ManagerComponent,
    LeaderboardComponent,
    HeaderComponent,
    FooterComponent,
    CollegeComponent,
    SalesComponent,
    EmployeeSalesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgChartsModule,
    NgSelectModule
  ]
})
export class DashboardModule { }
