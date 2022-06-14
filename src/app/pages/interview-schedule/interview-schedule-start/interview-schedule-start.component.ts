import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {Interview} from '../../interviews/interviews.entity';
import {Question} from '../../questions/questions.entity';
import {selectAllUsers} from '../../users/users.selectors';
import * as InterviewScheduleActions from '../interview-schedule.actions';
import {InterviewScheduleService} from '../interview-schedule.service';

@Component({
  selector: 'ngx-interview-schedule-start',
  templateUrl: './interview-schedule-start.component.html',
  styleUrls: ['./interview-schedule-start.component.scss'],
})
export class InterviewScheduleStartComponent implements OnInit {
  scheduleInterviewForm: FormGroup;
  addInterviewForm: FormGroup;
  users = [];
  questions: Partial<Question>[] = [];
  question: Partial<Question>;
  interview: Partial<Interview>;
  user: any;
  weights = [1, 2, 3, 4, 5];
  index = 0;

  constructor(private interviewScheduleService: InterviewScheduleService,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.scheduleInterviewForm = new FormGroup({
      candidateId: new FormControl('', Validators.required),
    });

    this.addInterviewForm = new FormGroup({
      comment: new FormControl('', Validators.required),
      mark: new FormControl('', Validators.required),
    });

    this.interview = this.interviewScheduleService.getInterview();

    this.store.dispatch(InterviewScheduleActions.loadInterviewSchedulePanelistsRequest({
      id: this.interview?.id,
      role: 'INTERVIEWEE',
    }));

    this.interviewScheduleService.loadScheduledInterviewQuestions(this.interview?.id).subscribe((data: any) => {
      data = data.result.map(d => {
        return {
          id: d.id,
          question: d.question.question,
          mark: d.question.weight,
        };
      });
      this.questions = data;
    });

    this.store.pipe(select(selectAllUsers)).subscribe((data) => {
      this.users = data;
    });
  }

  onSubmit() {
    const name = this.users.findIndex(x => x.id === parseInt(this.scheduleInterviewForm.value.candidateId, 0));
    if (name >= 0) {
      this.user = this.users[name];
    }

    if (this.questions.length) {
      this.question = this.questions[this.index];
    }
  }

  next() {
    const user = JSON.parse(localStorage.getItem('auth')).user.id;
    console.log('user', JSON.parse(localStorage.getItem('auth')));
    if (this.index <= this.questions.length - 1) {
      this.question = this.questions[this.index];

      const mark = {
        ...this.addInterviewForm.value,
        mark: parseInt(this.addInterviewForm.value.mark, 0),
        candidateId: parseInt(this.scheduleInterviewForm.value.candidateId, 0),
        interviewScheduleId: this.interview.id,
        questionInterviewId: this.question.id,
        panelistId: user,
      };

      this.interviewScheduleService.postScores(mark).subscribe((data) => {
        this.index++;
      }, error => {
        console.log('error', error);
      });

    } else {
      this.router.navigate(['/pages/job-application-form']);
    }
  }
}
