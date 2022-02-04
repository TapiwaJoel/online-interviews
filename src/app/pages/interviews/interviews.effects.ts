import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../utils/service.response';
import * as InterviewActions from './interviews.actions';
import {Interview} from './interviews.entity';
import {InterviewService} from './interviews.service';


@Injectable()
export class InterviewEffects {
  interview: Partial<Interview>;

  loadInterviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewActions.loadInterviewRequest),
      mergeMap(() => this.interviewService.getInterviews()
        .pipe(
          map((response: ServiceResponse<Partial<Interview>[]>) =>
            InterviewActions.loadInterviews({interviews: response.result})),
        )),
    ));

  createInterviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewActions.createRequest),
      mergeMap((action) => this.interviewService.createInterview(action.interview)
        .pipe(
          map((response: ServiceResponse<Partial<Interview>>) =>
            InterviewActions.loadInterview({interview: response.result})),
        )),
    ));

  editInterviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewActions.editRequest),
      mergeMap((action) => this.interviewService.editInterview(action.interview)
        .pipe(
          map((response: ServiceResponse<Partial<Interview>>) =>
            InterviewActions.loadInterviewEdited({interview: response.result})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));


  constructor(private actions$: Actions,
              private interviewService: InterviewService) {
  }
}
