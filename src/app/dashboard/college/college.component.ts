import {Component, OnInit} from '@angular/core';
import {College} from '../../dto/college';
import { CollegeService } from '../../services/college-service.service';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit{
  /** Allowed store values */
  stores: College['store'][] = ['East Barnet', 'Wood House'];

  /** All colleges from Firestore */
  colleges: College[] = [];

  /** Model bound to the add/edit form */
  current: College = {name: '', store: this.stores[0]};

  constructor(private collegeSvc: CollegeService) {
  }

  ngOnInit() {
    this.collegeSvc.getColleges().subscribe(list => {
      this.colleges = list;
    });
    console.log('hhh')
  }

  /** Add or update based on presence of current.id */
  async save() {
    if (!this.current.name.trim()) {
      return alert('College name is required');
    }

    if (this.current.id) {
      // existing → update
      await this.collegeSvc.updateCollege(this.current.id, {
        name: this.current.name,
        store: this.current.store
      });
    } else {
      // new → add
      await this.collegeSvc.addCollege({
        name: this.current.name,
        store: this.current.store
      });
    }

    this.resetForm();
  }

  /** Populate form for editing */
  edit(col: College) {
    this.current = {...col}; // shallow copy so form edits don’t immediately push
  }

  /** Delete with confirmation */
  async delete(col: College) {
    if (confirm(`Delete college “${col.name}”? This cannot be undone.`)) {
      await this.collegeSvc.deleteCollege(col.id!);
      if (this.current.id === col.id) this.resetForm();
    }
  }

  /** Clear the form back to “add new” */
  resetForm() {
    this.current = {name: '', store: this.stores[0]};
  }
}
