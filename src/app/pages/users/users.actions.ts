import {createAction, props} from '@ngrx/store';
import {User} from './users.entity';

export const loadUserRequest = createAction(
  '[User] Load Request',
);

export const createRequest = createAction(
  '[User] Create',
  props<{ user: Partial<User> }>(),
);

export const editRequest = createAction(
  '[User] Edit',
  props<{ user: Partial<User> }>(),
);

export const loadUser = createAction(
  '[User] Created',
  props<{ user: Partial<User> }>(),
);

export const loadUserEdited = createAction(
  '[User] Edited',
  props<{ user: Partial<User> }>(),
);

export const loadUsers = createAction(
  '[User] Loaded',
  props<{ users: Partial<User>[] }>(),
);
