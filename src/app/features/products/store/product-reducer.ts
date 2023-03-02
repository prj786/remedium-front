import {ProductStateModel} from "../model/productState.model";
import * as ProductActions from './product-actions';
import {createReducer, on} from "@ngrx/store";
import {ProductModel} from "../../../core/models/product.model";
import {PayloadModel} from "../../../core/models/payload.model";
export const initialState: ProductStateModel = {
  isLoading: false,
  products: {items: [], size: 0},
}

export const productReducers = createReducer(initialState,
  on(ProductActions.getProductsSuccess,
    (state: ProductStateModel, action) => {
      return {...state, isLoading: false, products: {items: action.items, size: action.size}}
    }
  ),
  on(ProductActions.createProductSuccess,
    (state: ProductStateModel, action: ProductModel) => (
      {...state, isLoading: false, products: {items: [...state.products.items, action], size: state.products.size + 1}}
    )
  ),
  on(ProductActions.updateProductSuccess,
    (state: ProductStateModel, action: ProductModel) => {
      const items = state.products.items.map(item => item._id === action._id ? action : item);
      return {...state, isLoading: false, products: { items, size: state.products.size}}
    }),
  on(ProductActions.sellProductSuccess,
  (state: ProductStateModel, action: {product: ProductModel, count: number}) => {
    const {product, count} = action;
    const items = state.products.items.map(item => item._id === product._id ? {...product, quantity: product.quantity - count} : item);
    return {...state, isLoading: false, products: {items, size: state.products.size}}
    }),
  on(ProductActions.deleteProductSuccess,
    (state: ProductStateModel, action: ProductModel) => (
      {...state, isLoading: false, products: {items: state.products.items.filter(product => product._id !== action._id), size: state.products.size - 1}}
    )
  )
);
