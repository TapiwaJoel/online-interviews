import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as UserActions from './users.actions';
import {User} from './users.entity';

export interface UserState extends EntityState<Partial<User>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<User>> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
});

export const initialUserState: UserState = adapter.getInitialState({
  loading: false,
});

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.loadUserRequest, state => ({...state, loading: true})),
  on(UserActions.loadUsers, (state, action) => {
    return adapter.upsertMany(action.users, {...state, loading: false});
  }),
  on(UserActions.loadUser, (state, action) => {
    return adapter.upsertOne(action.user, {...state, loading: false});
  }),
  on(UserActions.loadUserEdited, (state, action) => {
    return adapter.upsertOne(action.user, {...state, loading: false});
  }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

