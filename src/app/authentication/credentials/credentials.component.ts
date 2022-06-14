import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Toast} from '../../pages/utils/toast';
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
              private toast: Toast) {
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
    }, error => {
      this.isSubmitting = false;
      this.toast.makeToast('danger', 'Error', error.error.message);
    });
  }

  onSubmitToken() {
    this.isSubmitting = true;
    this.authenticationService.validate(this.verificationForm.value.token).subscribe((data: any) => {
      this.credentialSubmittedSuccess = true;
      this.isSubmitting = false;
      this.router.navigate(['/']);
      this.toast.makeToast('success', 'Verification Success', data.message);
    }, error => {
      this.isSubmitting = false;
      this.toast.makeToast('danger', 'Error', error.error.message);
    });
  }
}
