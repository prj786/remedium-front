import {AppStateModel} from "../../../shared/models/appstate.model";
import {createSelector} from "@ngrx/store";

export const selectFeature = (state: AppStateModel) =>
  state.hasOwnProperty('users') ? state.users : {users: {items: [], size: 0}, isLoading: false, error: null};

export const isLoading = createSelector(selectFeature, (state) => state.isLoading);
export const getUsersSuccess = createSelector(selectFeature, (state) => state.users);
