import {Component, OnInit} from '@angular/core';
import {SalesService} from "../../services/sales.service";
import {CollegeService} from "../../services/college-service.service";
import {College} from "../../dto/college";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit{
  store = 'East Barnet';
  college = '';
  cardsSold!: number;
  message = '';
  todaySales: any[] = []
  colleges: College[] = [];


  constructor(private salesService: SalesService,private collegeSvc: CollegeService) {}

  ngOnInit() {
    this.loadTodaySales();
  }

  async submitSale() {
    if (!this.college || !this.cardsSold) {
      alert('Please fill out all fields.');
      return;
    }

    await this.salesService.addSale({
      store: this.store,
      college: this.college,
      cardsSold: this.cardsSold,
      date: new Date().toISOString().split('T')[0]
    });

    this.message = 'Sale submitted successfully!';
    this.college = '';
    this.cardsSold = NaN;
    this.loadTodaySales();
  }

  async loadTodaySales() {
    const today = new Date().toISOString().split('T')[0];
    this.todaySales = await this.salesService.getSales(today);
  }

}
