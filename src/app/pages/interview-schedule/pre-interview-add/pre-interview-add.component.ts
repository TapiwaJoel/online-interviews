import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'ngx-pre-interview-add',
  templateUrl: './pre-interview-add.component.html',
  styleUrls: ['./pre-interview-add.component.scss'],
})
export class PreInterviewComponent implements OnInit {
  @Input() candidate;
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

  constructor() {
  }

  ngOnInit(): void {
    this.addInterviewForm = new FormGroup({
      applicantName: new FormControl(''),
      witness: new FormControl(''),
      witnessNumber: new FormControl(''),
    });


    this.user = JSON.parse(localStorage.getItem('auth'));
    console.log('this.user', this.user);
    this.addInterviewForm.patchValue({applicantName: this.user.user.fullname});
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
