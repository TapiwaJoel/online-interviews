import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {AppState} from '../../app-store/app-state';
import * as JobActions from '../../job/job.actions';
import {selectAllJobs} from '../../job/job.selectors';
import {Toast} from '../../utils/toast';


@Component({
  selector: 'ngx-job-application-form-add',
  templateUrl: './job-application-form-add.component.html',
  styleUrls: ['./job-application-form-add.component.scss'],
})
export class JobApplicationFormComponent implements OnInit {

  @Input() candidate;
  addInterviewForm: FormGroup;
  jobs = [];
  hasPassport = false;
  hasRelative = false;
  hasLicence = false;
  hasDisplinaryIssue = false;
  hasConviction = false;
  genders = ['MALE', 'FEMALE'];
  maritals = ['MARRIED', 'SINGLE', 'DIVORCED', 'WIDOWED', 'OTHER'];
  educationLevel = ['HIGH_SCHOOL', 'DIPLOMA', 'DEGREE',
    'POST_GRAD',
    'OTHER'];
  user;

  constructor(private route: ActivatedRoute,
              private store: Store<AppState>,
              private toast: Toast) {
  }

  ngOnInit(): void {
    this.store.dispatch(JobActions.loadJobRequest());
    this.addInterviewForm = new FormGroup({
      jobRoleId: new FormControl(''),
      howIntroduced: new FormControl(''),
      employer: new FormControl(''),
      position: new FormControl(''),
      educationLevel: new FormControl(''),
      currentRenumeration: new FormControl(''),
      reasonForLeaving: new FormControl(''),
      noticePeriod: new FormControl(''),
      expectedRenumeration: new FormControl(''),
      hobbies: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl(''),
      name: new FormControl(''),
      religion: new FormControl(''),
      nationality: new FormControl(''),
      idNumber: new FormControl(''),
      workPhone: new FormControl(''),
      homePhone: new FormControl(''),
      addressLine1: new FormControl(''),
      maritalStatus: new FormControl(''),
    });

    this.user = JSON.parse(localStorage.getItem('auth'));

    // this.addInterviewForm.patchValue({name: this.user.user.fullname});

    // this.route.queryParams.subscribe((dta: any) => {
    //   if (dta.token) {
    //     this.interviewScheduleService.checkValidate(dta.token)
    //       .subscribe((data: any) => {
    //         this.user = data.result;
    //         // console.log('data', data.result);
    //       });
    //   } else {
    //     this.toast.makeToast('danger', 'Error', 'Malformed url');
    //   }
    // });

    this.store.pipe(select(selectAllJobs)).subscribe((data) => {
      data = data.map((section: any) => {
        return {
          id: section.id,
          name: section.name,
          section: section.section.name,
          status: section.status,
          created: moment(section.created).locale('en-gb').format('LLLL'),
        };
      });

      this.jobs = data;
    });

  }

  onSubmit() {
    const jobApplication = {
      addressLine1: this.addInterviewForm.value.addressLine1,
      addressLine2: this.addInterviewForm.value.addressLine1,
      dob: moment(this.addInterviewForm.value.dob).format('MM-DD-YYYY'),
      educationLevel: this.addInterviewForm.value.educationLevel,
      educationTitle: 'MR',
      gender: this.addInterviewForm.value.gender,
      homePhone: this.addInterviewForm.value.homePhone,
      howIntroduced: this.addInterviewForm.value.howIntroduced,
      idNumber: this.addInterviewForm.value.idNumber,
      jobRoleId: this.addInterviewForm.value.jobRoleId,
      maritalStatus: this.addInterviewForm.value.maritalStatus,
      name: this.addInterviewForm.value.name,
      nationality: this.addInterviewForm.value.nationality,
      noOfChildren: this.addInterviewForm.value.noOfChildren,
      religion: this.addInterviewForm.value.religion,
      workPhone: this.addInterviewForm.value.workPhone,
      userId: this.user.user.id,
      hasPassport: this.hasPassport,
      hasRelative: this.hasRelative,
      hasLicence: this.hasLicence,
      hasDisplinaryIssue: this.hasDisplinaryIssue,
      hasConviction: this.hasConviction,
    };

    // this.jobApplicationFormService.postPreform(jobApplication).subscribe((data: any) => {
    //   console.log('job application', data);
    // }, error => {
    //   console.log('error', error);
    // });

  }


  onHasLicenceChange($event: boolean) {
    this.hasLicence = $event;
  }

  onHasPassportChange($event: boolean) {
    this.hasPassport = $event;
  }

  onHasRelativeChange($event: boolean) {
    this.hasRelative = $event;
  }

  onHasDisciplinaryChange($event: boolean) {
    this.hasDisplinaryIssue = $event;
  }

  onHasConvictionsChange($event: boolean) {
    this.hasConviction = $event;
  }
}
