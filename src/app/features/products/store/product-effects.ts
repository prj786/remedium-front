import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as ProductActions from './product-actions';
import {map, mergeMap} from "rxjs";
import {ProductService} from "../service/product.service";

@Injectable()
export class ProductEffects {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.getProducts),
      mergeMap((action) => {
        return this.productService.getProducts(action.search)
          .pipe(
            map((productsPayload) => ProductActions.getProductsSuccess(productsPayload)),
          );
      })
    )
  );

  createProduct$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(ProductActions.createProducts),
        mergeMap((action) => {
          return this.productService.createProduct(action)
            .pipe(
              map((item) => ProductActions.createProductSuccess(item)),
            )
          }
        )
      );
    }
  )

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.updateProducts),
      mergeMap( (action) => {
          return this.productService.updateProduct(action)
            .pipe(
              map(() => ProductActions.updateProductSuccess(action)),
            )
        }
      )
    )
  )

  sellProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.sellProducts),
      mergeMap( (action) => {
          return this.productService.sellProduct({product: action.product, count: action.count, userId: action.userId, newIncome: action.newIncome},)
            .pipe(
              map(() => ProductActions.sellProductSuccess(action)),
            )
        }
      )
    )
  )

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProducts),
      mergeMap( (action) => {
          return this.productService.deleteProduct(action)
            .pipe(
              map(() => ProductActions.deleteProductSuccess(action)),
            )
        }
      )
    )
  )

  constructor(private actions$: Actions, private productService: ProductService) {
  }

}
