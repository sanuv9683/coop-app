import { Component } from '@angular/core';
import {SalesService} from "../../services/sales.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  storeFilter = 'All';
  timeFilter = 'day';
  leaderboard: any[] = [];


  constructor(private salesService: SalesService) {}

  async loadLeaderboard() {
    const startDate = this.getStartDate(this.timeFilter);
    const sales = await this.salesService.getSales(startDate, this.storeFilter);

    const summary: Record<string, number> = {};
    for (const sale of sales) {
      const collegeName = sale['college'];
      if (!summary[collegeName]) summary[collegeName] = 0;
      summary[collegeName] += sale['cardsSold'];
    }

    this.leaderboard = Object.entries(summary)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }

  getStartDate(type: string): string {
    const now = new Date();
    let start: Date = new Date();

    switch (type) {
      case 'week': start.setDate(now.getDate() - 7); break;
      case 'month': start.setMonth(now.getMonth() - 1); break;
      case 'year': start.setFullYear(now.getFullYear() - 1); break;
    }

    return start.toISOString().split('T')[0];
  }
}
