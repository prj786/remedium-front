import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {PayloadModel} from "../../../core/models/payload.model";
import {UserModel} from "../../../core/models/user.model";
import {API} from "../../../core/util";
import {FilterModel} from "../../../shared/models/filter.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers(filter: FilterModel): Observable<PayloadModel<UserModel[]>> {
    const query = {
      search: filter.search ? filter.search : '',
      registerDateFrom: filter?.registerDateFrom ? filter?.registerDateFrom : '',
      registerDateTo: filter?.registerDateTo ? filter?.registerDateTo : '',
      totalSaleFrom: filter?.totalSaleFrom ? filter?.totalSaleFrom : '',
      totalSaleTo: filter?.totalSaleTo ? filter?.totalSaleTo : '',
    }

    // @ts-ignore
    const queryParams = new HttpParams({ fromObject: query });

    return this.http.get<PayloadModel<UserModel[]>>(`${API}users/list/${filter.limit}/${filter.page}`, {params: queryParams}).pipe(
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
