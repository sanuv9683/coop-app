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
  todaySales: any[] = [];
  stores = ['East Barnet', 'Wood House'] as const;
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

    this.collegeSvc.getColleges()
      .subscribe(list => this.colleges = list);
  }


//   colleges crud operations


  // holds the form state for add/edit
  current: College = { name: '', store: this.stores[0] };
  /** Add new or save edits */
  async save() {
    if (!this.current.name.trim()) {
      return alert('College name is required');
    }

    if (this.current.id) {
      await this.collegeSvc.updateCollege(this.current.id, {
        name: this.current.name,
        store: this.current.store
      });
    } else {
      await this.collegeSvc.addCollege({
        name: this.current.name,
        store: this.current.store
      });
    }

    this.resetForm();
  }

  edit(col: College) {
    this.current = { ...col };
  }

  async delete(col: College) {
    if (confirm(`Delete ${col.name}?`)) {
      await this.collegeSvc.deleteCollege(col.id!);
      if (this.current.id === col.id) this.resetForm();
    }
  }

  resetForm() {
    this.current = { name: '', store: this.stores[0] };
  }
}
