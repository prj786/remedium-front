import {PayloadModel} from "../../../core/models/payload.model";
import {ProductModel} from "../../../core/models/product.model";

export interface ProductStateModel {
  isLoading: boolean;
  products: PayloadModel<ProductModel[]>;
}
