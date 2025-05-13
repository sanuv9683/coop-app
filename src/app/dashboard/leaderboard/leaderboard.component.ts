import { Component } from '@angular/core';
import {SalesService} from "../../services/sales.service";
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  storeFilter = 'All';
  timeFilter = 'day';
  leaderboard: any[] = [];

  barChartLabels: string[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Cards Sold',
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b', '#858796'],
        borderColor: '#111',
        borderWidth: 1
      }
    ]
  };
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `🔥 ${context.dataset.label}: ${context.raw} cards`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
          font: {
            size: 12,
            weight: 600
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

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

    this.barChartLabels = this.leaderboard.map(entry => entry.name);
    this.barChartData.labels = this.barChartLabels;
    this.barChartData.datasets[0].data = this.leaderboard.map(entry => entry.total);
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
