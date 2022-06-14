import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication.component';
import {CredentialsComponent} from './credentials/credentials.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {SignInComponent} from './sign-in/sign-in.component';

const routes: Routes = [{
  path: '',
  component: AuthenticationComponent,
  children: [
    {
      path: '',
      component: SignInComponent,
    },
    {
      path: 'auth',
      component: CredentialsComponent,
    },
    {
      path: 'password-reset',
      component: PasswordResetComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
  let;
  res = {
    7: '20',
  };
}
