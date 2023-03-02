import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {PayloadModel} from "../../../core/models/payload.model";
import {UserModel} from "../../../core/models/user.model";
import {API} from "../../../core/util";
import {UserFilterModel} from "../model/user-filter.model";
import {ProductFilterModel} from "../../products/model/product-filter.model";
import {ProductModel} from "../../../core/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(filter: UserFilterModel): Observable<PayloadModel<UserModel[]>> {
    const query = {
      search: filter.search ? filter.search : '',
      registerDateFrom: filter?.registerDateFrom ? filter?.registerDateFrom : '',
      registerDateTo: filter?.registerDateTo ? filter?.registerDateTo : '',
      totalSaleFrom: filter?.totalSaleFrom ? filter?.totalSaleFrom : '',
      totalSaleTo: filter?.totalSaleTo ? filter?.totalSaleTo : '',
    }

    // @ts-ignore
    return this.http.get<PayloadModel<UserModel[]>>(`${API}users/list/${filter.limit}/${filter.page}`, {params: {...query}}).pipe(
      shareReplay()
    )
  }

  createUser(body: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${API}users/create`, body).pipe(
      shareReplay()
    )
  }

  updateUser(body: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${API}users/update`, body).pipe(
      shareReplay()
    )
  }

  deleteUser(body: UserModel): Observable<UserModel> {
    return this.http.delete<UserModel>(`${API}users/delete/${body._id}`,).pipe(
      shareReplay()
    )
  }

}
