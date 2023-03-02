import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../services/user.service";
import * as UserActions from './user-actions';
import {map, mergeMap} from "rxjs";

@Injectable()
export class UserEffects {
  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsers),
      mergeMap((action) => {
        return this.userService.getUsers(action)
          .pipe(
            map((usersPayload) => UserActions.getUsersSuccess(usersPayload)),
          );
      })
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap( (action) => {
          return this.userService.createUser(action)
            .pipe(
              map((user) => UserActions.createUserSuccess(user))
          )
        }
      )
    )
  )

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap( (action) => {
          return this.userService.updateUser(action)
            .pipe(
              map(() => UserActions.updateUserSuccess(action))
            )
        }
      )
    )
  )

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap( (action) => {
          return this.userService.deleteUser(action)
            .pipe(
              map(() => UserActions.deleteUserSuccess(action))
            )
        }
      )
    )
  )

  constructor(private actions$: Actions, private userService: UserService) {
  }

}
