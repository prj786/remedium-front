import {UserStateModel} from "../../features/users/model/userState.model";
import {ProductStateModel} from "../../features/products/model/productState.model";

export interface AppStateModel {
  users: UserStateModel,
  products: ProductStateModel
}
