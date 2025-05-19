import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Chart, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import 'chartjs-chart-matrix';


// Register Chart.js components
Chart.register(...registerables);
import { ChartType } from 'chart.js';

interface SalesRecord {
  employeeName: string;
  date: Date;
  count: number;
  store: string;
}

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent  implements OnInit, AfterViewInit {
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
  stores = Array.from(new Set(this.salesData.map(r => r.store)));
  selectedStore = this.stores[0];

  periods: Period[] = ['daily', 'weekly', 'monthly', 'yearly'];
  selectedPeriod: Period = 'daily';

  aggregatedData: { employeeName: string; total: number }[] = [];

  // Bar Chart
  public barChartType: ChartType = 'bar';
  @ViewChild('barChart', { read: BaseChartDirective }) barChart?: BaseChartDirective;
  // @ViewChild('barChart', { read: BaseChartDirective }) barChart?: BaseChartDirective;
  public barChartOptions: ChartOptions = { responsive: true, scales: { x: {}, y: { beginAtZero: true } } };
  public barChartData = { labels: [] as string[], datasets: [{ data: [] as number[], label: '' }] };

  // Line Chart
  public lineChartType: ChartType = 'line';
  @ViewChild('lineChart', { read: BaseChartDirective }) lineChart?: BaseChartDirective;
  // @ViewChild('lineChart', { read: BaseChartDirective }) lineChart?: BaseChartDirective;
  public lineChartOptions: ChartOptions = { responsive: true, scales: { x: {}, y: { beginAtZero: true } } };
  public lineChartData = { labels: [] as string[], datasets: [{ data: [] as number[], label: 'Monthly Sales' }] };

  // Stacked Bar Chart
  public stackedChartType: ChartType = 'bar';
  @ViewChild('stackedChart', { read: BaseChartDirective }) stackedChart?: BaseChartDirective;
  // @ViewChild('stackedChart', { read: BaseChartDirective }) stackedChart?: BaseChartDirective;
  public stackedChartOptions: ChartOptions = {
    responsive: true,
    scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
  };
  public stackedChartData = { labels: [] as string[], datasets: [] as any[] };

  // Doughnut Chart
  public doughnutChartType: ChartType = 'doughnut';
  @ViewChild('doughnutChart', { read: BaseChartDirective }) doughnutChart?: BaseChartDirective;
  // @ViewChild('doughnutChart', { read: BaseChartDirective }) doughnutChart?: BaseChartDirective;
  public doughnutChartOptions: ChartOptions = { responsive: true, plugins: { legend: { position: 'bottom' } } };
  public doughnutChartData = { labels: [] as string[], datasets: [{ data: [] as number[], label: 'Sales Share' }] };

  // Heatmap Calendar
  public heatmapChartType: ChartType = 'matrix';
  // @ViewChild('heatmapChart', { read: BaseChartDirective }) heatmapChart?: BaseChartDirective;
  @ViewChild('heatmapChart', { read: BaseChartDirective }) heatmapChart?: BaseChartDirective;
  public heatmapChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: { type: 'time', time: { unit: 'day' }, offset: true },
      y: { type: 'category', labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: () => '',
          label: ctx => {
            const v: any = ctx.raw;
            return `${v.x.toDateString()}: ${v.v} sales`;
          }
        }
      }
    }
  };
  public heatmapChartData: any = { datasets: [{ label: 'Daily Sales', data: [] }] };

  ngOnInit() {
    this.aggregateEmployeeSales();
  }

  ngAfterViewInit() {
    this.updateAllCharts();
  }

  onStoreChange(store: string) {
    this.selectedStore = store;
    this.updateAllCharts();
  }

  onPeriodChange(period: Period) {
    this.selectedPeriod = period;
    this.updateAllCharts();
  }

  private updateAllCharts() {
    this.aggregateEmployeeSales();
    this.renderBarChart();
    this.renderLineChart();
    this.renderStackedChart();
    this.renderDoughnutChart();
    this.renderHeatmapChart();
  }

  private aggregateEmployeeSales() {
    const now = new Date();
    const filtered = this.salesData.filter(r => r.store === this.selectedStore && this.isInSelectedPeriod(r.date, now));
    const map = new Map<string, number>();
    filtered.forEach(r => map.set(r.employeeName, (map.get(r.employeeName) || 0) + r.count));
    this.aggregatedData = Array.from(map.entries()).map(([employeeName, total]) => ({ employeeName, total }));
  }

  private renderBarChart() {
    if (!this.barChart) return;
    this.barChartData.labels = this.aggregatedData.map(d => d.employeeName);
    this.barChartData.datasets[0].data = this.aggregatedData.map(d => d.total);
    this.barChartData.datasets[0].label = `${this.selectedPeriod} Sales`;
    this.barChart.chart?.update();
  }

  private renderLineChart() {
    if (!this.lineChart) return;
    const now = new Date();
    const months = Array.from({ length: 12 }).map((_, i) => new Date(now.getFullYear(), now.getMonth() - (11 - i), 1));
    this.lineChartData.labels = months.map(d => d.toLocaleString('default', { month: 'short' }));
    this.lineChartData.datasets[0].data = months.map(m =>
      this.salesData
        .filter(r => r.store === this.selectedStore && r.date.getFullYear() === m.getFullYear() && r.date.getMonth() === m.getMonth())
        .reduce((sum, r) => sum + r.count, 0)
    );
    this.lineChart.chart?.update();
  }

  private renderStackedChart() {
    if (!this.stackedChart) return;
    const employees = Array.from(new Set(this.salesData.map(r => r.employeeName)));
    const datasets = this.stores.map(store => ({
      label: store,
      data: employees.map(emp =>
        this.salesData
          .filter(r => r.store === store && r.employeeName === emp && this.isInSelectedPeriod(r.date, new Date()))
          .reduce((sum, r) => sum + r.count, 0)
      ),
      stack: 'Stack 0'
    }));
    this.stackedChartData.labels = employees;
    this.stackedChartData.datasets = datasets;
    this.stackedChart.chart?.update();
  }

  private renderDoughnutChart() {
    if (!this.doughnutChart) return;
    this.doughnutChartData.labels = this.aggregatedData.map(d => d.employeeName);
    this.doughnutChartData.datasets[0].data = this.aggregatedData.map(d => d.total);
    this.doughnutChart.chart?.update();
  }

  private renderHeatmapChart() {
    if (!this.heatmapChart) return;
    const now = new Date();
    const filtered = this.salesData.filter(r => r.store === this.selectedStore && this.isInSelectedPeriod(r.date, now));
    const points = filtered.map(r => ({ x: r.date, y: r.date.getDay(), v: r.count }));
    this.heatmapChartData.datasets[0].data = points;
    this.heatmapChart.chart?.update();
  }

  private isInSelectedPeriod(date: Date, now: Date): boolean {
    const d = new Date(date);
    switch (this.selectedPeriod) {
      case 'daily': return d.toDateString() === now.toDateString();
      case 'weekly': { const w = new Date(now); w.setDate(now.getDate() - 7); return d >= w && d <= now; }
      case 'monthly': return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      case 'yearly': return d.getFullYear() === now.getFullYear();
    }
  }
}
