import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NbActionsModule, NbAlertModule, NbCardModule, NbSpinnerModule} from '@nebular/theme';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {SectionEffects} from '../section/section.effects';
import {sectionReducer} from '../section/section.reducer';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserListComponent} from './user-list/user-list.component';
import {UsersComponent} from './users.component';

import {UsersRoutingModule} from './users-routing.module';
import {UserEffects} from './users.effects';
import {userReducer} from './users.reducer';

@NgModule({
  declarations: [
    UsersComponent,
    UserAddComponent,
    UserEditComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NbActionsModule,
    NbCardModule,
    NbSpinnerModule,
    NbAlertModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
    Ng2SmartTableModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule {
}
