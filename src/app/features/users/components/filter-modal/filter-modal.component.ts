import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FilterModel} from "../../../../shared/models/filter.model";

@Component({
  selector: 'rm-filter-modal',
  templateUrl: './filter-modal.component.html',
})
export class FilterModalComponent {
  @Input()
  visible: boolean = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  filteredData: EventEmitter<FilterModel> = new EventEmitter<FilterModel>();

  filterForm: FormGroup = new FormGroup({
    registerDateFrom: new FormControl(''),
    registerDateTo: new FormControl(''),
    totalSaleFrom: new FormControl(null),
    totalSaleTo: new FormControl(null),
  });

  onVisibleChange() {
    this.visibleChange.emit(this.visible);
  }

  today: Date = new Date();

  onAccept(): void {
    this.filteredData.emit(this.filterForm.value);
    this.visibleChange.emit(false);
  }

  clearFilter(): void {
    this.filterForm.reset();
    this.filteredData.emit({
      registerDateFrom: null,
      registerDateTo: null,
      totalSaleFrom: null,
      totalSaleTo: null
    })
  }

}
