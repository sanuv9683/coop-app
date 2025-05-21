import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import {SalesRecord} from "../../dto/Sales";
import {SalesService} from "../../services/sales.service";

@Component({
  selector: 'app-employee-sales',
  templateUrl: './employee-sales.component.html',
  styleUrls: ['./employee-sales.component.css']
})
export class EmployeeSalesComponent implements OnInit{
  salesData: SalesRecord[] = [];
  employees:any = [];
  selectedEmployee = this.employees[0];

  constructor(private sService:SalesService) {
  }
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

    this.sService.getAllSales("All").subscribe(t=>{
      this.salesData=t;
     this.employees= Array.from(new Set(this.salesData.map(r => r.employeeName)));
      this.selectedEmployee=this.employees[0];
      this.refreshAll();
    });

  }

  onEmployeeChange(name: string) {
    this.selectedEmployee = name;
    this.refreshAll();
  }

  private refreshAll() {
    this.sService.getAllSales("All").subscribe(t=>{
      this.salesData=t;
      this.employees= Array.from(new Set(this.salesData.map(r => r.employeeName)));
    });

    const now = new Date();
    const filtered = this.salesData.filter(r => r.employeeName === this.selectedEmployee);

    // --- DAILY (today) ---
    const today = now.toISOString().split('T')[0];
    const dailyCount = filtered
      .filter(r => r.date === today)
      .reduce((sum, r) => sum + r.count, 0);
    this.dailyData.labels  = [today];
    this.dailyData.datasets[0].data = [dailyCount];
    this.dailyChart?.chart?.update();

    // --- WEEKLY (last 7 days) ---
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 6); // include today
    console.log(oneWeekAgo);
    const weekBuckets: { date: string, total: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(oneWeekAgo);
      d.setDate(oneWeekAgo.getDate() + i);
      const key = d.toISOString().split('T')[0];
      weekBuckets.push({ date: key, total: 0 });
    }
    filtered.forEach(r => {
      const ds = r.date;
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
      if (new Date(r.date).getMonth() === mo && new Date(r.date).getFullYear() === yr) {
        monthBuckets[new Date(r.date).getDate() - 1].total += r.count;
      }
    });
    this.monthlyData.labels = monthBuckets.map(b => b.day.toString());
    this.monthlyData.datasets[0].data = monthBuckets.map(b => b.total);
    this.monthlyChart?.chart?.update();

    // --- YEARLY (by month) ---
    const yearlyBuckets = Array.from({ length: 12 })
      .map((_, i) => ({ month: i, total: 0 }));
    filtered.forEach(r => {
      if (new Date(r.date).getFullYear() === now.getFullYear()) {
        yearlyBuckets[new Date(r.date).getMonth()].total += r.count;
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
