import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {InterviewScheduleService} from '../interview-schedule.service';

@Component({
  selector: 'ngx-reference-check-add',
  templateUrl: './reference-check-add.component.html',
  styleUrls: ['./reference-check-add.component.scss'],
})
export class ReferenceCheckAddComponent implements OnInit {
  @Input() candidate;
  addInterviewForm: FormGroup;
  statuses = [{val: true, key: 'YES'}, {val: false, key: 'NO'}];

  constructor(private interviewScheduleService: InterviewScheduleService,
              ) {
  }

// /pages/job-application-form

  ngOnInit(): void {
    this.addInterviewForm = new FormGroup({
      authorityRelations: new FormControl('', Validators.required),
      candidateId: new FormControl(''),
      checkedBy: new FormControl('', Validators.required),
      comments: new FormControl('', Validators.required),
      competent: new FormControl('', Validators.required),
      contactNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      organization: new FormControl('', Validators.required),
      peerRelations: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      positionOfReferee: new FormControl('', Validators.required),
      reasonForleaving: new FormControl('', Validators.required),
      recommendedBy: new FormControl('', Validators.required),
      refereeRelationship: new FormControl('', Validators.required),
      workAttitude: new FormControl('', Validators.required),
      workEffectiveness: new FormControl('', Validators.required),
    });

    this.addInterviewForm.patchValue({
      candidateId: this.candidate.fullname,
    });

    console.log('candidate', this.candidate);
    this.interviewScheduleService.getRefCheckById(this.candidate.id).subscribe((data: any) => {
      console.log('reference', data.result);
      // this.reference = data.result;
    }, (error: HttpErrorResponse) => {
      console.log('error', error.error.message);
    });
  }

  onSubmit() {
    let competent = this.addInterviewForm.value.competent;
    competent = competent === 'true';

    const candidate = {...this.addInterviewForm.value, candidateId: this.candidate.id, competent: competent};
    this.interviewScheduleService.addRefCheck(candidate).subscribe((data) => {
      this.addInterviewForm.reset();
      console.log(data);
    }, error => {
      console.log('error', error);
    });
  }
}
