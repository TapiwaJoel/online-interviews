import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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

  constructor(private interviewScheduleService: InterviewScheduleService) {
  }

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
  }

  onSubmit() {
    console.log(this.addInterviewForm.value);
    let competent = this.addInterviewForm.value.competent;
    competent = competent === 'true';

    const candidate = {...this.addInterviewForm.value, candidateId: this.candidate.id, competent: competent};
    console.log('candidate', candidate);
    this.interviewScheduleService.addRefCheck(candidate).subscribe((data) => {
      this.addInterviewForm.reset();
      console.log(data);
    }, error => {
      console.log('error', error);
    });
  }
}
