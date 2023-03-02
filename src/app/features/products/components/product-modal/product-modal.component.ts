import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductModel} from "../../../../core/models/product.model";

@Component({
  selector: 'rm-product-modal',
  templateUrl: './product-modal.component.html',
})
export class ProductModalComponent implements OnChanges {
  @Input()
  visible: boolean = false;

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  accepted: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

  @Input()
  productData: ProductModel | null = {
    productName: '',
    quantity: 0,
    price: 0
  };

  @Input()
  editMode: boolean = false;

  productForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    productName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$|^[ა-ჰ]+')]),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)])
  });

  ngOnChanges(changes: SimpleChanges) {
    if (this.productData) {
      this.productForm.patchValue(this.productData);
    }
  }

  onVisibleChange() {
    this.visibleChange.emit(this.visible);
  }

  accept() {
    if (this.productForm.valid) {
      this.accepted.emit(this.productForm.value);
      this.editMode = false;
    }
  }
}
