import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ProductModel} from "../../../../core/models/product.model";
import {UserModel} from "../../../../core/models/user.model";

@Component({
  selector: 'rm-sell-modal',
  templateUrl: './sell-modal.component.html',
})
export class SellModalComponent implements OnChanges{
  @Input()
  maxCount: number = 100;

  @Input()
  sellItem!: ProductModel;

  @Input()
  visible: boolean = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  accepted: EventEmitter<number> = new EventEmitter<number>();

  itemCount: number = 1;

  onVisibleChange() {
    this.visibleChange.emit(this.visible);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['sellItem'] && this.sellItem) {
      this.maxCount = this.sellItem.quantity;
    }
  }

  accept() {
    if (this.itemCount) {
      this.accepted.emit(this.itemCount);
    }
  }
}
