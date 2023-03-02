import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../../core/models/user.model";
import {FilterModel} from "../../../../shared/models/filter.model";
import {select, Store} from "@ngrx/store";
import * as UserActions from '../../store/user-actions';
import {AppStateModel} from "../../../../shared/models/appstate.model";
import {Observable} from "rxjs";
import {PayloadModel} from "../../../../core/models/payload.model";
import {getUsersSuccess, isLoading} from "../../store/user-selectors";
import {AuthStore} from "../../../../core/store/auth.store";

@Component({
  selector: 'rm-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userTableHeader: string[] = [
    'username',
    'firstName',
    'lastName',
    'saleIncome',
    'registerDate'
  ];

  selectedUser: UserModel = {
    _id: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    saleIncome: 0
  };

  filter: FilterModel = {
    search: '',
    registerDateFrom: null,
    registerDateTo: null,
    totalSaleFrom: null,
    totalSaleTo: null,
    page: 1,
    limit: 10,
  }

  showModal: boolean = false;
  showFilter: boolean = false;
  editMode = false;

  isLoading$: Observable<boolean> = new Observable<boolean>();
  isAuthenticated$!: Observable<boolean>;
  userTableData$!: Observable<PayloadModel<UserModel[]>>;

  constructor(private store: Store<AppStateModel>, private authStore: AuthStore) {
    this.isAuthenticated$ = authStore.isLoggedIn$;
    this.isLoading$ = store.pipe(select(isLoading));
    this.userTableData$ = store.pipe(select(getUsersSuccess));
  }

  ngOnInit() {
    this.store.dispatch(UserActions.getUsers(this.filter));
  }

  deleteData(ev: any): void {
    this.store.dispatch(UserActions.deleteUser(ev));
  }

  editUser(user: UserModel): void {
    if (user) {
      this.selectedUser = user;
      this.editMode = true;
    }
  }

  addUser() {
    this.showModal = true;
  }

  createUser(user: UserModel) {
    this.store.dispatch(UserActions.createUser(user));
    this.showModal = false;
  }

  updateUser(user: UserModel) {
    this.store.dispatch(UserActions.updateUser(user));
    this.editMode = false;
  }

  searchFor(ev: string): void {
    this.filter.search = ev;
    this.store.dispatch(UserActions.getUsers(this.filter));
  }

  filtered(ev: FilterModel): void {
    this.filter = {
      ...this.filter,
      ...ev
    }
    this.store.dispatch(UserActions.getUsers(this.filter));
  }

  rowChange(size: number): void {
    console.log(size);
    this.filter.page = size;
    this.store.dispatch(UserActions.getUsers(this.filter));
  }

}
