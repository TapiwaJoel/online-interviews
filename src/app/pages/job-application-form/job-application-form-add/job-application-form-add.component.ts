import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-job-application-form-add',
  templateUrl: './job-application-form-add.component.html',
  styleUrls: ['./job-application-form-add.component.scss'],
})
export class JobApplicationFormAddComponent implements OnInit {
  addInterviewForm: FormGroup;

  genders = ['MALE', 'FEMALE'];
  maritals = ['SINGLE', 'MARRIED'];
  educationLevel = ['Diploma', 'Bachelor’s degree',
    'Master’s Degree',
    'Doctorate'];

  constructor() {
  }

  ngOnInit(): void {
    this.addInterviewForm = new FormGroup({
      candidateId: new FormControl(''),
      employmentReferenceChecks: new FormControl(''),
      qualificationChecks: new FormControl(''),
      criminalChecks: new FormControl(''),
      creditChecks: new FormControl(''),
      careerHistory: new FormControl(''),
      employmentHistory: new FormControl(''),
      referenceHistory: new FormControl(''),
      remunerationHistory: new FormControl(''),
      criminalHistory: new FormControl(''),
      witnessName: new FormControl(''),
      witnessPhoneNumber: new FormControl(''),
    });

  }
}
