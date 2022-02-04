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

  constructor(private preInterviewFormService: PreInterviewFormService) {
  }

  ngOnInit(): void {
    this.addInterviewForm = new FormGroup({
      applicantName: new FormControl(''),
      witness: new FormControl(''),
      witnessNumber: new FormControl(''),
    });
  }

  onSubmit() {

    const preInterview = {
      ...this.addInterviewForm.value,
      employmentChecks: this.employmentChecks,
      qualificationChecks: this.qualificationChecks,
      criminalChecks: this.criminalChecks,
      creditChecks: this.creditChecks,
      writtenAgreement: this.writtenAgreement,
      workDetails: this.workDetails,
      referencesProvided: this.referencesProvided,
      termination: this.termination,
      hasCriminalRecord: this.hasCriminalRecord,
    };

    this.preInterviewFormService.postPreform(preInterview)
      .subscribe(data => {
        console.log('postPreform', data);
      }, error => {
        console.log('post', error);
      });
  }

  onCheckChange($event: Event) {
    console.log('checkChange', $event);
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
