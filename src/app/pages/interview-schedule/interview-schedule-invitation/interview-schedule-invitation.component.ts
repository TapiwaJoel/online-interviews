import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../app-store/app-state';
import {Interview} from '../../interviews/interviews.entity';
import * as QuestionActions from '../../questions/questions.actions';
import {Question} from '../../questions/questions.entity';
import {TimeSlot} from '../../time-slot/time-slot.entity';
import {selectAllTimeSlots} from '../../time-slot/time-slot.selectors';
import {User} from '../../users/users.entity';
import {selectAllUsers} from '../../users/users.selectors';
import * as InterviewScheduleActions from '../interview-schedule.actions';
import {InterviewScheduleService} from '../interview-schedule.service';

@Component({
  selector: 'ngx-interview-schedule-invitation',
  templateUrl: './interview-schedule-invitation.component.html',
  styleUrls: ['./interview-schedule-invitation.component.scss'],
})
export class InterviewScheduleInvitationComponent implements OnInit {
  @Input() addType: string;
  scheduleInterviewForm: FormGroup;
  scheduleInterviewFormQuestion: FormGroup;
  users: Partial<User>[] = [];
  timeSlots: Partial<TimeSlot>[] = [];
  questions: Partial<Question>[] = [];
  interview: Partial<Interview>;

  constructor(private store: Store<AppState>,
              private interviewScheduleService: InterviewScheduleService) {
  }

  ngOnInit(): void {

    this.interview = this.interviewScheduleService.getInterview();
    this.store.dispatch(QuestionActions.loadQuestionRequest());

    this.scheduleInterviewForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      timeslotId: new FormControl('', Validators.required),
    });

    this.scheduleInterviewFormQuestion = new FormGroup({
      questionId: new FormControl('', Validators.required),
    });

    this.store.pipe(select(selectAllTimeSlots)).subscribe((data) => {
      this.timeSlots = data;
    });

    this.store.pipe(select(selectAllUsers)).subscribe((data) => {
      this.users = data;
    });

    this.interviewScheduleService.loadSectionQuestions(this.interview.sectionId).subscribe((data: any) => {
      data = data.result.map(d => {
        return {
          id: d.question.id,
          question: d.question.question,
        };
      });
      this.questions = data;
    });
  }

  onSubmit() {
    this.store.dispatch(InterviewScheduleActions.createInvitationRequest(
      {interviewScheduleInvitation: {...this.scheduleInterviewForm.value, interviewScheduleId: this.interview.id}}));
  }

  onSubmitQuestion() {
    this.interviewScheduleService.addQuestionToInterviewSchedule({
      interviewScheduleId: this.interview.id,
      questionId: this.scheduleInterviewFormQuestion.value.questionId,
    }).subscribe((res) => {
      console.log('res', res);
    });
  }
}
