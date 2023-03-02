import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {UserModel} from "../../../core/models/user.model";
import {ProductModel} from "../../../core/models/product.model";
import {ConfirmationService} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {AuthStore} from "../../../core/store/auth.store";
import {Observable} from "rxjs";

@Component({
  selector: 'rm-table',
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input()
  loading: boolean = false;

  @Output()
  searched: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  searchFields: string[] = [];

  @Input()
  searchEnabled: boolean = true;

  @Input()
  tableData: UserModel[] | ProductModel[] = [];

  @Input()
  tableHeaders: string[] = [];

  @Input()
  filterEnabled: boolean = false;

  @Input()
  caption!: 'users' | 'products';

  @Input()
  pagination: boolean = true;

  @Output()
  add = new EventEmitter();

  @Output()
  filter = new EventEmitter();

  @Input()
  actionsRow: boolean | null = false;

  @Input()
  totalRecords: number = 0;

  @Input()
  rows: number = 10;

  @Input()
  isProduct: boolean = false;

  @Output()
  pageChanged = new EventEmitter<any>();

  @Output()
  sale = new EventEmitter<ProductModel | UserModel>();

  @Output()
  filterClear: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  edit = new EventEmitter();

  @Output()
  delete = new EventEmitter();

  user$: Observable<UserModel>;

  constructor(private confirmationService: ConfirmationService, private translateService: TranslateService, private authStore: AuthStore) {
    this.user$ = authStore.user$;
  }

  confirmDelete(event: Event, data: UserModel | ProductModel): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant('modal.delete-product'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translateService.instant('modal.confirm'),
      rejectLabel: this.translateService.instant('modal.cancel'),
      accept: () => {
        this.delete.emit(data);
      }
    });
  }

  confirmSale(event: Event, data: UserModel | ProductModel): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: this.translateService.instant('modal.sale-product'),
      acceptLabel: this.translateService.instant('modal.confirm'),
      rejectLabel: this.translateService.instant('modal.cancel'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.sale.emit(data)
      }
    });
  }
}
