import {Component, OnInit} from '@angular/core';
import {ProductModel} from "../../../../core/models/product.model";
import {Observable} from "rxjs";
import {PayloadModel} from "../../../../core/models/payload.model";
import {select, Store} from "@ngrx/store";
import {AppStateModel} from "../../../../shared/models/appstate.model";
import {AuthStore} from "../../../../core/store/auth.store";
import * as ProductActions from '../../store/product-actions';
import {getAllProductsSuccess} from "../../store/product-selectors";
import {getProducts} from "../../store/product-actions";
import {NotifyService} from "../../../../shared/services/notify.service";

@Component({
  selector: 'rm-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productTableHeader: string[] = [
    'productName',
    'price',
    'quantity',
  ]

  selectedProduct!: ProductModel;
  sellProduct!: ProductModel;
  showModal: boolean = false;
  showSellModal: boolean = false;
  editMode = false;

  productsTableData$: Observable<PayloadModel<ProductModel[]>> = this.store.select(getAllProductsSuccess);

  constructor(private store: Store<AppStateModel>, private notify: NotifyService) {
  }

  ngOnInit() {
    this.store.dispatch(ProductActions.getProducts({search: ''}));
  }

  editProduct(product: ProductModel) {
    this.selectedProduct = product;
    this.editMode = true;
  }

  addProduct(ev: ProductModel) {
    this.store.dispatch(ProductActions.createProducts(ev));
    this.showModal = false;
  }

  deleteProduct(ev: any) {
    this.store.dispatch(ProductActions.deleteProducts(ev));
  }

  modifyProduct(ev: any) {
    this.store.dispatch(ProductActions.updateProducts(ev));
    this.editMode = false;
  }

  sellItemModal(item: any) {
    this.sellProduct = item;
    this.showSellModal = true;
  }

  sellItems(ev: number) {
    const user = localStorage.getItem('auth_info');
    if (!user) {
      return;
    }

    const userData = JSON.parse(user).user;

    const newIncome = userData.saleIncome + (this.sellProduct.price * ev);

    this.store.dispatch(ProductActions.sellProducts({product: this.sellProduct, count: ev, userId: JSON.parse(user).user._id, newIncome }));
    this.showSellModal = false;
  }

  search(ev: any): void {
    this.store.dispatch(ProductActions.getProducts({search: ev}));
  }

}
