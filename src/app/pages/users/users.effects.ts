import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../utils/service.response';
import * as UserActions from './users.actions';
import {User} from './users.entity';
import {UserService} from './users.service';

@Injectable()
export class UserEffects {
  user: Partial<User>;

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserRequest),
      mergeMap(() => this.userService.getUsers()
        .pipe(
          map((response: ServiceResponse<Partial<User>[]>) =>
            UserActions.loadUsers({users: response.result})),
        )),
    ));

  createUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createRequest),
      mergeMap((action) => this.userService.createUser(action.user)
        .pipe(
          tap(() => console.log('TEST', action.user)),
          map((response: ServiceResponse<Partial<User>>) =>
            UserActions.loadUser({user: response.result})),
        )),
    ));

  editUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editRequest),
      mergeMap((action) => this.userService.editUser(action.user)
        .pipe(
          map((response: ServiceResponse<Partial<User>>) =>
            UserActions.loadUserEdited({user: response.result})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private userService: UserService) {
  }
}

