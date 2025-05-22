import {Component, OnInit} from '@angular/core';
import {SalesService} from "../../services/sales.service";
import {CollegeService} from "../../services/college-service.service";
import {College} from "../../dto/college";
import {SalesRecord} from "../../dto/Sales";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  store = 'East Barnet';
  college = '';
  cardsSold!: number;
  message = '';
  todaySales: SalesRecord[] = []
  colleagues: College[] = [];
  selectedDate: string = new Date().toISOString().slice(0, 10);

  selectedCollegeName: string = ''

  constructor(private salesService: SalesService, private collegeSvc: CollegeService,private alertS:AlertService) {
  }


  ngOnInit() {
     this.loadTodaySales();

    this.collegeSvc.getColleges().subscribe(list => {
      this.colleagues = list;
    });
  }

  async submitSale() {
    if (!this.selectedCollegeName || !this.cardsSold) {
      this.alertS.normal("Please fill out all fields.");
      return;
    }

    this.salesService.saleExists(this.selectedCollegeName, this.selectedDate).then(t => {
      if (!t) {
        this.alertS.error("This record is already added");
      } else {

        this.salesService.addSale({
          employeeName: this.selectedCollegeName,
          date: this.selectedDate,
          count: this.cardsSold,
          store: this.store
        }).then(t=>{
          this.alertS.myAlert("Record Successfully Added.!")
        });

        this.college = '';
        this.loadTodaySales();
        this.cardsSold = NaN;

      }
    });
  }

  async loadTodaySales() {
    const today = new Date().toISOString().split('T')[0];
    this.salesService.getSales(today).subscribe(res => {
      this.todaySales = res;
    });
  }

  /** called by the template’s delete button */
  async onDelete(sale: SalesRecord) {
    this.alertS.confirm("Are you sure.?","Really delete this sale.?").then(t=>{
      if (!t.isConfirmed) return;
      try {
         this.salesService.deleteSale(sale.id!).then(t=>{
           this.loadTodaySales();
         });

      } catch (err) {
        this.alertS.error("Could not delete; check console.");
      }
    });
  }

}
