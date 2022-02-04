import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'ngx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  loading$: Observable<boolean>;
  success$: Observable<boolean>;
  isSubmitting = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    localStorage.clear();
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
    // private authenticationService: AuthenticationService,
  }

  public onSubmit(): void {
    this.isSubmitting = false;
    this.authenticationService.login(this.signInForm.value).subscribe((data) => {
      this.isSubmitting = false;
      localStorage.setItem('auth', JSON.stringify(data));
      this.router.navigate(['/pages/interview-schedule']);
      console.log('data', data);
    }, error => {
      this.isSubmitting = false;
      console.log('error', error);
    });
  }
}
