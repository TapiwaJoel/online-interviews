import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import * as InterviewActions from '../../interviews/interviews.actions';
import * as InterviewScheduleActions from '../interview-schedule.actions';
import {Interview} from '../../interviews/interviews.entity';
import {selectAllInterviews} from '../../interviews/interviews.selectors';

@Component({
  selector: 'ngx-interview-add',
  templateUrl: './interview-schedule-add.component.html',
  styleUrls: ['./interview-schedule-add.component.scss'],
})
export class InterviewScheduleAddComponent implements OnInit {
  scheduleInterviewForm: FormGroup;
  interviews: Partial<Interview>[] = [];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.scheduleInterviewForm = new FormGroup({
      interviewId: new FormControl('', Validators.required),
      dateOfInterview: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllInterviews)).subscribe((data) => {
      this.interviews = data;
    });
  }

  onSubmit() {
    this.store.dispatch(InterviewScheduleActions.createRequest({interviewSchedule: this.scheduleInterviewForm.value}));
  }
}
