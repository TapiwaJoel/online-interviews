import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {AppState} from '../../pages/app-store/app-state';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'ngx-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss'],
})
export class CredentialsComponent implements OnInit {

  signInForm: FormGroup;
  verificationForm: FormGroup;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  isSubmitting = false;
  credentialSubmittedSuccess = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    localStorage.clear();
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
    this.verificationForm = new FormGroup({
      'token': new FormControl(null, Validators.required),
    });
  }

  public onSubmit(): void {
    this.isSubmitting = true;
    this.authenticationService.credentials(this.signInForm.value).subscribe((data) => {
      this.credentialSubmittedSuccess = true;
      this.isSubmitting = false;
      console.log('data', data);
    }, error => {
      this.isSubmitting = false;
      console.log('error', error);
    });
  }

  onSubmitToken() {
    this.isSubmitting = true;
    this.authenticationService.validate(this.verificationForm.value.token).subscribe((data) => {
      this.credentialSubmittedSuccess = true;
      this.isSubmitting = false;
      console.log('data', data);
    }, error => {
      this.isSubmitting = false;
      console.log('error', error);
    });
  }
}
