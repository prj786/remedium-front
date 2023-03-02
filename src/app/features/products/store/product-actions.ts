import {createAction, props} from "@ngrx/store";
import {PayloadModel} from "../../../core/models/payload.model";
import {ProductModel} from "../../../core/models/product.model";
import {ProductFilterModel} from "../model/product-filter.model";

// Products Get
export const getProducts= createAction('[Products] Get Products', props<ProductFilterModel>());
export const getProductsSuccess = createAction('[Products] Get Products success', props<PayloadModel<ProductModel[]>>());

// Product Removal
export const deleteProducts= createAction('[Products] Delete Products', props<ProductModel>());
export const deleteProductSuccess = createAction('[Products] Delete Product Product', props<ProductModel>());

// Product Create
export const createProducts= createAction('[Products] Post Products', props<ProductModel>());
export const createProductSuccess = createAction('[Products] Post Product', props<ProductModel>());
// Update Product
export const updateProducts= createAction('[Products] Put Products', props<ProductModel>());
export const updateProductSuccess = createAction('[Products] Put Product', props<ProductModel>());
// Sell Product
export const sellProducts= createAction('[Products] Sell Products', props<{ product: ProductModel, count: number, userId: string, newIncome: number }>());
export const sellProductSuccess = createAction('[Products] Sell Product', props<{ product: ProductModel, count: number }>());
