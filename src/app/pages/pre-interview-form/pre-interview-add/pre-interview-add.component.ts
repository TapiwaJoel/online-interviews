import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {PreInterviewFormService} from '../pre-interview-form.service';

@Component({
  selector: 'ngx-pre-interview-add',
  templateUrl: './pre-interview-add.component.html',
  styleUrls: ['./pre-interview-add.component.scss'],
})
export class PreInterviewAddComponent implements OnInit {
  addInterviewForm: FormGroup;
  employmentChecks = false;
  qualificationChecks = false;
  criminalChecks = false;
  creditChecks = false;
  writtenAgreement = false;
  workDetails = false;
  referencesProvided = false;
  termination = false;
  hasCriminalRecord = false;
  user;
  constructor(private preInterviewFormService: PreInterviewFormService) {
  }

  ngOnInit(): void {
    this.addInterviewForm = new FormGroup({
      applicantName: new FormControl(''),
      witness: new FormControl(''),
      witnessNumber: new FormControl(''),
    });

    console.log('localStorage', localStorage.getItem('auth'));

    this.user = JSON.parse(localStorage.getItem('auth'));
    console.log('this.user', this.user);
    this.addInterviewForm.patchValue({applicantName: this.user.user.fullname});
  }

  onSubmit() {

    const preInterview = {
      ...this.addInterviewForm.value,
      employmentChecks: this.employmentChecks,
      qualificationChecks: this.qualificationChecks,
      criminalChecks: this.criminalChecks,
      creditChecks: this.creditChecks,
      userId: this.user.user.id,
      writtenAgreement: this.writtenAgreement,
      workDetails: this.workDetails,
      referencesProvided: this.referencesProvided,
      termination: this.termination,
      hasCriminalRecord: this.hasCriminalRecord,
    };


    console.log('preInterview', preInterview);
    this.preInterviewFormService.postPreform(preInterview)
      .subscribe(data => {
        console.log('postPreformz', data);
      }, error => {
        console.log('post', error);
      });
  }

  onEmploymentChecksChange($event: boolean) {
    this.employmentChecks = $event;
  }

  onQualificationChecksCheckChange($event: boolean) {
    this.qualificationChecks = $event;
  }

  onCriminalCheckChange($event: boolean) {
    this.criminalChecks = $event;
  }

  onCreditCheckChange($event: boolean) {
    this.creditChecks = $event;
  }

  onWrittenAgreementChange($event: boolean) {
    this.writtenAgreement = $event;
  }

  onWorkDetailsChange($event: boolean) {
    this.workDetails = $event;
  }

  onReferencesProvidedChange($event: boolean) {
    this.referencesProvided = $event;
  }

  onTerminationChange($event: boolean) {
    this.termination = $event;
  }

  onHasCriminalRecordChange($event: boolean) {
    this.hasCriminalRecord = $event;
  }
}
