import {UserModel} from "../../../core/models/user.model";
import {PayloadModel} from "../../../core/models/payload.model";

export interface UserStateModel {
  isLoading: boolean;
  users: PayloadModel<UserModel[]>;
}
