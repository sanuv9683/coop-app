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
import { NgxPaginationModule } from 'ngx-pagination';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule }     from '@angular/material/card';
import { MatButtonModule }   from '@angular/material/button';
import { MatIconModule }     from '@angular/material/icon';

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
    NgSelectModule,
    NgxPaginationModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class DashboardModule { }
