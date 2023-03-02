import {AppStateModel} from "../../../shared/models/appstate.model";
import {createSelector} from "@ngrx/store";

export const selectFeature = (state: AppStateModel) => state.products;
export const getAllProductsSuccess = createSelector(selectFeature, (state) => state.products);
