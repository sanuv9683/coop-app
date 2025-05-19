import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import {SalesRecord} from "../../dto/Sales";

@Component({
  selector: 'app-employee-sales',
  templateUrl: './employee-sales.component.html',
  styleUrls: ['./employee-sales.component.css']
})
export class EmployeeSalesComponent {
  salesData: SalesRecord[] = [
    {employeeName: 'Kasun', date: new Date('2025-10-13'), count: 16, store: 'East Barnet'},
    {employeeName: 'Kasun', date: new Date('2025-09-28'), count: 12, store: 'Woodhouse'},
    {employeeName: 'Jigisha', date: new Date('2025-10-19'), count: 3, store: 'Woodhouse'},
    {employeeName: 'Kasun', date: new Date('2025-07-25'), count: 2, store: 'East Barnet'},
    {employeeName: 'Alex', date: new Date('2025-04-19'), count: 4, store: 'Woodhouse'},
    {employeeName: 'Taylor', date: new Date('2025-01-26'), count: 1, store: 'East Barnet'},
    {employeeName: 'Ravi', date: new Date('2025-04-10'), count: 7, store: 'East Barnet'},
    {employeeName: 'Jigisha', date: new Date('2025-12-29'), count: 13, store: 'Woodhouse'},
    {employeeName: 'Taylor', date: new Date('2025-07-01'), count: 1, store: 'East Barnet'},
    {employeeName: 'Jigisha', date: new Date('2025-10-07'), count: 7, store: 'East Barnet'},
    {employeeName: 'Taylor', date: new Date('2025-05-05'), count: 2, store: 'East Barnet'},
    {employeeName: 'Taylor', date: new Date('2025-03-11'), count: 12, store: 'East Barnet'},
    {employeeName: 'Alex', date: new Date('2025-10-28'), count: 9, store: 'Woodhouse'},
    {employeeName: 'Jigisha', date: new Date('2025-10-23'), count: 11, store: 'Woodhouse'},
    {employeeName: 'Ravi', date: new Date('2025-09-30'), count: 15, store: 'Woodhouse'},
    {employeeName: 'Maggie', date: new Date('2025-06-18'), count: 5, store: 'East Barnet'},
    {employeeName: 'Sam', date: new Date('2025-11-16'), count: 8, store: 'Woodhouse'},
    {employeeName: 'Alex', date: new Date('2025-02-02'), count: 11, store: 'East Barnet'},
    {employeeName: 'Maggie', date: new Date('2025-11-22'), count: 5, store: 'Woodhouse'},
    {employeeName: 'Sam', date: new Date('2025-10-23'), count: 14, store: 'Woodhouse'},
    {employeeName: 'Jigisha', date: new Date('2025-05-07'), count: 11, store: 'East Barnet'},
    {employeeName: 'Jigisha', date: new Date('2025-11-13'), count: 10, store: 'East Barnet'},
    {employeeName: 'Maggie', date: new Date('2025-06-06'), count: 6, store: 'Woodhouse'},
    {employeeName: 'Alex', date: new Date('2025-07-08'), count: 2, store: 'East Barnet'},
    {employeeName: 'Jigisha', date: new Date('2025-12-08'), count: 4, store: 'East Barnet'},
    {employeeName: 'Ravi', date: new Date('2025-01-25'), count: 11, store: 'Woodhouse'},
    {employeeName: 'Jigisha', date: new Date('2025-12-01'), count: 19, store: 'East Barnet'},
    {employeeName: 'Taylor', date: new Date('2025-09-01'), count: 14, store: 'Woodhouse'},
    {employeeName: 'Sam', date: new Date('2025-11-09'), count: 4, store: 'Woodhouse'},
    {employeeName: 'Alex', date: new Date('2025-06-14'), count: 5, store: 'East Barnet'},
    {employeeName: 'Jigisha', date: new Date('2025-06-29'), count: 4, store: 'Woodhouse'},
    {employeeName: 'Kasun', date: new Date('2025-08-17'), count: 13, store: 'East Barnet'},
    {employeeName: 'Taylor', date: new Date('2025-12-12'), count: 17, store: 'Woodhouse'},
    {employeeName: 'Sam', date: new Date('2025-07-20'), count: 9, store: 'East Barnet'},
    {employeeName: 'Maggie', date: new Date('2025-03-04'), count: 2, store: 'East Barnet'},
    {employeeName: 'Ravi', date: new Date('2025-09-05'), count: 12, store: 'Woodhouse'},
    {employeeName: 'Kasun', date: new Date('2025-11-30'), count: 7, store: 'Woodhouse'},
    {employeeName: 'Ravi', date: new Date('2025-04-15'), count: 16, store: 'East Barnet'},
    {employeeName: 'Sam', date: new Date('2025-02-20'), count: 18, store: 'Woodhouse'},
    {employeeName: 'Maggie', date: new Date('2025-01-14'), count: 6, store: 'East Barnet'},
    {employeeName: 'Alex', date: new Date('2025-10-02'), count: 3, store: 'Woodhouse'},
    {employeeName: 'Taylor', date: new Date('2025-08-05'), count: 19, store: 'East Barnet'},
    {employeeName: 'Maggie', date: new Date('2025-09-22'), count: 8, store: 'Woodhouse'},
    {employeeName: 'Kasun', date: new Date('2025-02-27'), count: 2, store: 'East Barnet'},
    {employeeName: 'Ravi', date: new Date('2025-05-30'), count: 14, store: 'Woodhouse'},
    {employeeName: 'Alex', date: new Date('2025-03-22'), count: 1, store: 'Woodhouse'},
    {employeeName: 'Jigisha', date: new Date('2025-11-04'), count: 17, store: 'East Barnet'},
    {employeeName: 'Taylor', date: new Date('2025-06-24'), count: 12, store: 'Woodhouse'},
    {employeeName: 'Sam', date: new Date('2025-01-18'), count: 9, store: 'Woodhouse'},
    {employeeName: 'Kasun', date: new Date('2025-04-28'), count: 5, store: 'East Barnet'},
    {employeeName: 'Maggie', date: new Date('2025-08-30'), count: 7, store: 'East Barnet'},
    {employeeName: 'Alex', date: new Date('2025-07-16'), count: 15, store: 'Woodhouse'},
    {employeeName: 'Ravi', date: new Date('2025-12-19'), count: 11, store: 'Woodhouse'},
    {employeeName: 'Sam', date: new Date('2025-09-11'), count: 6, store: 'East Barnet'},
    {employeeName: 'Taylor', date: new Date('2025-02-08'), count: 4, store: 'East Barnet'},
    {employeeName: 'Kasun', date: new Date('2025-11-09'), count: 10, store: 'Woodhouse'},
    {employeeName: 'Maggie', date: new Date('2025-03-30'), count: 13, store: 'Woodhouse'},
    {employeeName: 'Alex', date: new Date('2025-05-22'), count: 8, store: 'East Barnet'},
    {employeeName: 'Ravi', date: new Date('2025-08-09'), count: 2, store: 'East Barnet'},
    {employeeName: 'Taylor', date: new Date('2025-10-16'), count: 20, store: 'East Barnet'},
    {employeeName: 'Sam', date: new Date('2025-04-03'), count: 10, store: 'Woodhouse'},
    {employeeName: 'Maggie', date: new Date('2025-06-12'), count: 1, store: 'Woodhouse'},
    {employeeName: 'Kasun', date: new Date('2025-09-18'), count: 14, store: 'East Barnet'},
    {employeeName: 'Alex', date: new Date('2025-12-21'), count: 5, store: 'East Barnet'},
  ];
  employees = Array.from(new Set(this.salesData.map(r => r.employeeName)));
  selectedEmployee = this.employees[0];

  // Refs for four charts
  @ViewChild('dailyChart',  { read: BaseChartDirective }) dailyChart?:  BaseChartDirective;
  @ViewChild('weeklyChart', { read: BaseChartDirective }) weeklyChart?: BaseChartDirective;
  @ViewChild('monthlyChart',{ read: BaseChartDirective }) monthlyChart?: BaseChartDirective;
  @ViewChild('yearlyChart', { read: BaseChartDirective }) yearlyChart?: BaseChartDirective;

  // Chart configs
  public chartOptions: ChartOptions = { responsive: true, scales: { x: {}, y: { beginAtZero: true } } };

  public dailyData   = { labels: [] as string[], datasets: [{ data: [] as number[], label: 'Daily Sold' }] };
  public weeklyData  = { labels: [] as string[], datasets: [{ data: [] as number[], label: 'Weekly Sold' }] };
  public monthlyData = { labels: [] as string[], datasets: [{ data: [] as number[], label: 'Monthly Sold' }] };
  public yearlyData  = { labels: [] as string[], datasets: [{ data: [] as number[], label: 'Yearly Sold' }] };

  public barType: ChartType = 'bar';
  public lineType: ChartType = 'line';

  ngOnInit() {
    this.refreshAll();
  }

  onEmployeeChange(name: string) {
    this.selectedEmployee = name;
    this.refreshAll();
  }

  private refreshAll() {
    const now = new Date();
    const filtered = this.salesData.filter(r => r.employeeName === this.selectedEmployee);

    // --- DAILY (today) ---
    const today = now.toDateString();
    const dailyCount = filtered
      .filter(r => r.date.toDateString() === today)
      .reduce((sum, r) => sum + r.count, 0);
    this.dailyData.labels  = [today];
    this.dailyData.datasets[0].data = [dailyCount];
    this.dailyChart?.chart?.update();

    // --- WEEKLY (last 7 days) ---
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 6); // include today
    const weekBuckets: { date: string, total: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(oneWeekAgo);
      d.setDate(oneWeekAgo.getDate() + i);
      const key = d.toDateString();
      weekBuckets.push({ date: key, total: 0 });
    }
    filtered.forEach(r => {
      const ds = r.date.toDateString();
      const bucket = weekBuckets.find(b => b.date === ds);
      if (bucket) bucket.total += r.count;
    });
    this.weeklyData.labels = weekBuckets.map(b => b.date.substr(0, 10));
    this.weeklyData.datasets[0].data = weekBuckets.map(b => b.total);
    this.weeklyChart?.chart?.update();

    // --- MONTHLY (current month) ---
    const mo = now.getMonth(), yr = now.getFullYear();
    const daysInMonth = new Date(yr, mo + 1, 0).getDate();
    const monthBuckets = Array.from({ length: daysInMonth })
      .map((_, i) => ({ day: i + 1, total: 0 }));
    filtered.forEach(r => {
      if (r.date.getMonth() === mo && r.date.getFullYear() === yr) {
        monthBuckets[r.date.getDate() - 1].total += r.count;
      }
    });
    this.monthlyData.labels = monthBuckets.map(b => b.day.toString());
    this.monthlyData.datasets[0].data = monthBuckets.map(b => b.total);
    this.monthlyChart?.chart?.update();

    // --- YEARLY (by month) ---
    const yearlyBuckets = Array.from({ length: 12 })
      .map((_, i) => ({ month: i, total: 0 }));
    filtered.forEach(r => {
      if (r.date.getFullYear() === now.getFullYear()) {
        yearlyBuckets[r.date.getMonth()].total += r.count;
      }
    });
    const monthNames = yearlyBuckets.map(b =>
      new Date(now.getFullYear(), b.month, 1)
        .toLocaleString('default', { month: 'short' })
    );
    this.yearlyData.labels = monthNames;
    this.yearlyData.datasets[0].data = yearlyBuckets.map(b => b.total);
    this.yearlyChart?.chart?.update();
  }
}
