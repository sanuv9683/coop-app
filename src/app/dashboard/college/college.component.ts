import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {College} from '../../dto/college';
import {CollegeService} from '../../services/college-service.service';


@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {
  @Input() colleges: College[] = [];
  /** Emit the updated list back up */
  @Output() itemsChange = new EventEmitter<College[]>();

  current: College = {name: '', coo_pid: ''};
  page = 1;
  readonly pageSize = 3;
  searchText = '';

  constructor(private collegeSvc: CollegeService) {
  }

  ngOnInit() {
    this.getAllColleges();
  }

  /**
   * First filter by searchText, then paginate in template
   */
  get filteredColleges(): College[] {
    if (!this.searchText) return this.colleges;
    const term = this.searchText.toLowerCase();
    return this.colleges.filter(c =>
      c.name.toLowerCase().includes(term) ||
      c.coo_pid.toLowerCase().includes(term)
    );
  }

  getAllColleges() {
    this.collegeSvc.getColleges().subscribe(list => {
      this.colleges = list;
      this.itemsChange.emit(list);
    });
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
        coo_pid: this.current.coo_pid
      });
    } else {
      // new → add
      await this.collegeSvc.addCollege({
        name: this.current.name,
        coo_pid: this.current.coo_pid
      });
    }
    this.getAllColleges();
    this.resetForm();
  }

  /** Populate form for editing */
  edit(col: College) {
    this.current = {...col};
    this.getAllColleges();// shallow copy so form edits don’t immediately push
  }

  /** Delete with confirmation */
  async delete(col: College) {
    if (confirm(`Delete college “${col.name}”? This cannot be undone.`)) {
      await this.collegeSvc.deleteCollege(col.id!);
      if (this.current.id === col.id) this.resetForm();
    }
    this.getAllColleges();
  }

  /** Clear the form back to “add new” */
  resetForm() {
    this.current = {name: '', coo_pid: ''};
  }
}
