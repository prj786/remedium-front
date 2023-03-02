import { Injectable } from '@angular/core';
import {Observable, shareReplay, tap} from "rxjs";
import {PayloadModel} from "../../../core/models/payload.model";
import {API} from "../../../core/util";
import {HttpClient} from "@angular/common/http";
import {ProductModel} from "../../../core/models/product.model";
import {AuthStore} from "../../../core/store/auth.store";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private authStore: AuthStore) { }

  getProducts(search: any = null): Observable<PayloadModel<ProductModel[]>> {
    return this.http.get<PayloadModel<ProductModel[]>>(`${API}products/100`, {params: {search}}).pipe(
      shareReplay()
    )
  }

    deleteProduct(product: ProductModel): Observable<PayloadModel<ProductModel[]>> {
    return this.http.delete<PayloadModel<ProductModel[]>>(`${API}products/${product._id}`).pipe(
      shareReplay()
    )
  }

  createProduct(product: ProductModel): Observable<any> {
    const body: ProductModel = {
      productName: product.productName,
      quantity: product.quantity,
      price: product.price
    }
    return this.http.post(`${API}products/create`, body).pipe(
      shareReplay()
    )
  }

  updateProduct(product: ProductModel): Observable<any> {
    return this.http.put(`${API}products/update/${product._id}`, product).pipe(
      shareReplay()
    )
  }

  sellProduct(payload: {product: ProductModel, count: number, userId: string, newIncome: number}): Observable<any> {
    return this.http.put(`${API}products/sell/${payload.product._id}`, {...payload}).pipe(
      tap(user => {
        this.authStore.userSubject$.next(user);
        const userInfo = localStorage.getItem('auth_info');
        if (userInfo) {
          const newUserInfo = JSON.parse(userInfo);
          localStorage.setItem('auth_info', JSON.stringify({token: newUserInfo.token, user}));
        }

      }),
      shareReplay()
    )
  }
}
