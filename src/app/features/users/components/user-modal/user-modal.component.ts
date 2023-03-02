import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "../../../../core/models/user.model";

@Component({
  selector: 'rm-user-modal',
  templateUrl: './user-modal.component.html',
})
export class UserModalComponent implements OnChanges {
  @Input()
  visible: boolean = false;

  @Output()
  accepted: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  @Output()
  visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  userData: UserModel = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    saleIncome: 0
  };

  @Input()
  editMode: boolean = false;

  productForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    saleIncome: new FormControl('')
  });

  ngOnChanges(changes: SimpleChanges) {
    if (this.userData) {
      this.productForm.patchValue(this.userData);
    }
  }

  onVisibleChange() {
    this.visibleChange.emit(this.visible);
  }

  accept() {
    if (this.productForm.valid) {
      this.accepted.emit({...this.productForm.value, _id: this.userData._id, registerDate: this.userData.registerDate});
      this.editMode = false;
    }
  }
}
