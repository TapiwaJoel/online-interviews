import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {CredentialsComponent} from './credentials/credentials.component';
import {SignInComponent} from './sign-in/sign-in.component';

const routes: Routes = [{
  path: '',
  component: AuthenticationComponent,
  children: [{
    path: '',
    component: SignInComponent,
  }, {
    path: 'auth',
    component: CredentialsComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}
