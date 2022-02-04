import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAddComponent} from './user-add/user-add.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserListComponent} from './user-list/user-list.component';
import {UsersComponent} from './users.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'add',
      component: UserAddComponent,
    }, {
      path: 'edit',
      component: UserEditComponent,
    }, {
      path: '',
      component: UserListComponent,
    }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {
}
