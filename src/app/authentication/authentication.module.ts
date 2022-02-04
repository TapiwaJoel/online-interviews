import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NbSpinnerModule} from '@nebular/theme';

import {AuthenticationRoutingModule} from './authentication-routing.module';
import {AuthenticationComponent} from './authentication.component';
import {CredentialsComponent} from './credentials/credentials.component';
import {SignInComponent} from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    SignInComponent,
    CredentialsComponent,
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    NbSpinnerModule,
  ],
})
export class AuthenticationModule {
}
