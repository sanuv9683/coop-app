import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
// Register Chart.js components
// Chart.register(...registerables);
import {Chart, ChartOptions, ChartType, registerables} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import 'chartjs-chart-matrix';
import {SalesRecord} from "../../dto/Sales";

import {MatrixController, MatrixElement} from 'chartjs-chart-matrix';
import {SalesService} from "../../services/sales.service";

Chart.register(...registerables, MatrixController, MatrixElement);


type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit, AfterViewInit {
// Bar Chart
  public barChartType: ChartType = 'bar';
  @ViewChild('barChart', {read: BaseChartDirective}) barChart?: BaseChartDirective;
  public barChartOptions: ChartOptions = {responsive: true, scales: {x: {}, y: {beginAtZero: true}}};
  public barChartData = {labels: [] as string[], datasets: [{data: [] as number[], label: ''}]};

  // Stacked Bar Chart
  public stackedChartType: ChartType = 'bar';
  @ViewChild('stackedChart', {read: BaseChartDirective}) stackedChart?: BaseChartDirective;
  public stackedChartOptions: ChartOptions = {
    responsive: true,
    scales: {x: {stacked: true}, y: {stacked: true, beginAtZero: true}}
  };


  salesData: SalesRecord[] = [];

  stores = ["East Barnet", "Wood House", "All"];

  selectedStore = this.stores[2];

  periods: Period[] = ['daily', 'weekly', 'monthly', 'yearly'];
  selectedPeriod: Period = 'daily';

  aggregatedData: { employeeName: string; total: number }[] = [];

  constructor(private sService: SalesService) {
    sService.getSales(new Date().toISOString().split('T')[0], "All").subscribe(t => {
      this.salesData = t;
      this.updateAllCharts();
    })
  }


  public stackedChartData = {labels: [] as string[], datasets: [] as any[]};


  ngOnInit() {
    this.aggregateEmployeeSales();
  }

  ngAfterViewInit() {
    this.updateAllCharts();
  }

  onStoreChange(store: string) {
    this.selectedStore = store;
    this.sService.getAllSales(this.selectedStore).subscribe(t => {
      this.salesData = t;
      this.updateAllCharts();
    })
  }

  onPeriodChange(period: Period) {
    this.selectedPeriod = period;
    this.sService.getAllSales(this.selectedStore).subscribe(t => {
      this.salesData = t;
      this.updateAllCharts();
    })
  }

  private updateAllCharts() {
    this.aggregateEmployeeSales();
    this.renderBarChart();
    this.renderStackedChart();
  }

  private aggregateEmployeeSales() {
    const now = new Date();
    if (this.selectedStore=="All"){
      const filtered = this.salesData.filter(r =>  this.isInSelectedPeriod(new Date(r.date), now));
      const map = new Map<string, number>();
      filtered.forEach(r => map.set(r.employeeName, (map.get(r.employeeName) || 0) + r.count));
      this.aggregatedData = Array.from(map.entries()).map(([employeeName, total]) => ({employeeName, total}));
    }else{
      const filtered = this.salesData.filter(r => r.store === this.selectedStore && this.isInSelectedPeriod(new Date(r.date), now));
      const map = new Map<string, number>();
      filtered.forEach(r => map.set(r.employeeName, (map.get(r.employeeName) || 0) + r.count));
      this.aggregatedData = Array.from(map.entries()).map(([employeeName, total]) => ({employeeName, total}));
    }

  }

  private renderBarChart() {
    if (!this.barChart) return;
    this.barChartData.labels = this.aggregatedData.map(d => d.employeeName);
    this.barChartData.datasets[0].data = this.aggregatedData.map(d => d.total);
    this.barChartData.datasets[0].label = `${this.selectedPeriod} Sales`;
    this.barChart.chart?.update();
  }

  private renderStackedChart() {
    if (!this.stackedChart) return;
    const employees = Array.from(new Set(this.salesData.map(r => r.employeeName)));
    const datasets = this.stores.map(store => ({
      label: store,
      data: employees.map(emp =>
        this.salesData
          .filter(r => r.store === store && r.employeeName === emp && this.isInSelectedPeriod(new Date(r.date), new Date()))
          .reduce((sum, r) => sum + r.count, 0)
      ),
      stack: 'Stack 0'
    }));
    this.stackedChartData.labels = employees;
    this.stackedChartData.datasets = datasets;
    this.stackedChart.chart?.update();
  }

  private isInSelectedPeriod(date: Date, now: Date): boolean {
    const d = new Date(date);
    switch (this.selectedPeriod) {
      case 'daily':
        return d.toDateString() === now.toDateString();
      case 'weekly': {
        const w = new Date(now);
        w.setDate(now.getDate() - 7);
        return d >= w && d <= now;
      }
      case 'monthly':
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      case 'yearly':
        return d.getFullYear() === now.getFullYear();
    }
  }
}
