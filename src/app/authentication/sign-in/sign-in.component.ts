import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {InterviewScheduleService} from '../../pages/interview-schedule/interview-schedule.service';
import {Toast} from '../../pages/utils/toast';
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
  user;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private interviewScheduleService: InterviewScheduleService,
    private toast: Toast,
    private authenticationService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    localStorage.clear();
    this.checkToken();
    this.signInForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
    });
    // pre-interview-form
    // private authenticationService: AuthenticationService,
  }


  checkToken() {
    this.route.queryParams.subscribe((dta: any) => {
      if (dta.token) {
        this.interviewScheduleService.checkValidate(dta.token)
          .subscribe((data: any) => {
            this.user = data.result;
            localStorage.setItem('auth', JSON.stringify({user: this.user}));
            this.router.navigate(['/pages/pre-interview-form']).then((what) => {
              console.log(what);
            });
          });
      }
    });
  }

  public onSubmit(): void {
    this.isSubmitting = false;
    this.authenticationService.login(this.signInForm.value).subscribe((data) => {
      this.isSubmitting = false;
      localStorage.setItem('auth', JSON.stringify(data));
      this.router.navigate(['/pages/interview-schedule']);
    }, error => {
      this.isSubmitting = false;
    });
  }

  public resetPassword() {
    this.router.navigate(['/password-reset']);
  }
}
