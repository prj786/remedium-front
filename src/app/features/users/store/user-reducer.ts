import {UserStateModel} from "../model/userState.model";
import * as UserActions from './user-actions';
import {createReducer, on} from "@ngrx/store";
export const initialState: UserStateModel = {
  isLoading: false,
  users: {items: [], size: 0},
}

export const userReducers = createReducer(initialState,
  on(UserActions.getUsers,
  (state: UserStateModel) => ({...state, isLoading: true})
  ),
  on(UserActions.getUsersSuccess,
    (state: UserStateModel, action) => {
      return {...state, isLoading: false, users: {items: action.items, size: action.size}}
    }
  ),
  // create
  on(UserActions.createUser,
    (state: UserStateModel) => ({...state, isLoading: true})
  ),
  on(UserActions.createUserSuccess,
    (state: UserStateModel, action) => ({...state, isLoading: false, users: {items: [...state.users.items, action], size: state.users.size + 1}})
  ),
  // delete
  on(UserActions.deleteUser,
    (state: UserStateModel) => ({...state, isLoading: true})
  ),
  on(UserActions.deleteUserSuccess,
    (state: UserStateModel, action) => (
      {...state, isLoading: false, users: {items: state.users.items.filter(user => user._id !== action._id), size: state.users.size - 1}}
    )
  ),
  // update
  on(UserActions.updateUser,
    (state: UserStateModel) => ({...state, isLoading: true})
  ),
  on(UserActions.updateUserSuccess,
    (state: UserStateModel, action) => {
      const items = state.users.items.map(item => item._id === action._id ? action : item);
      return {...state, isLoading: false, users: {items:items, size: state.users.size}}
    }
  )
);
