import {createAction, props} from "@ngrx/store";
import {PayloadModel} from "../../../core/models/payload.model";
import {UserModel} from "../../../core/models/user.model";
import {UserFilterModel} from "../model/user-filter.model";

export const getUsers = createAction('[Users] Get Users', props<UserFilterModel>());
export const getUsersSuccess = createAction('[Users] Get Users success', props<PayloadModel<UserModel[]>>());

// User Creation
export const createUser = createAction('[Users] create User', props<UserModel>());
export const createUserSuccess = createAction('[Users] create User Success', props<UserModel>());

// User Removal
export const deleteUser = createAction('[Users] Delete User', props<UserModel>());
export const deleteUserSuccess = createAction('[Users] Delete User Success', props<UserModel>());

// User Update
export const updateUser = createAction('[Users] Put User', props<UserModel>());
export const updateUserSuccess = createAction('[Users] Put User Success', props<UserModel>());
