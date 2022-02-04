import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../utils/service.response';
import {InterviewScheduleInvitation} from './interview-schedule-invitation.entity';
import * as InterviewScheduleActions from './interview-schedule.actions';
import {InterviewSchedule} from './interview-schedule.entity';
import {selectInterviewScheduleById} from './interview-schedule.selectors';
import {InterviewScheduleService} from './interview-schedule.service';
import {Panelist} from './panelist.enity';


@Injectable()
export class InterviewScheduleEffects {
  interviewSchedule: Partial<InterviewSchedule>;

  loadInterviewSchedules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewScheduleActions.loadInterviewScheduleRequest),
      mergeMap(() => this.interviewScheduleService.getInterviewSchedules()
        .pipe(
          map((response: ServiceResponse<Partial<InterviewSchedule>[]>) =>
            InterviewScheduleActions.loadInterviewSchedules({interviewSchedules: response.result})),
        )),
    ));


  loadInterviewSchedulePanelistsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewScheduleActions.loadInterviewSchedulePanelistsRequest),
      mergeMap((action) => this.interviewScheduleService.loadInterviewSchedulePanelistsRequest(action.id, action.role)
        .pipe(
          map((response: ServiceResponse<Partial<Panelist>[]>) => {
              console.log('response', response);
              if (response.success && response.result.length) {
                const scheduleId = response.result[0].interviewSchedule.id;
                this.store.select(selectInterviewScheduleById(scheduleId)).subscribe(
                  (interviewSchedule: Partial<InterviewSchedule>) => {
                    const schedule = {...interviewSchedule, panelists: response.result};
                    InterviewScheduleActions.loadInterviewSchedule(
                      {interviewSchedule: schedule});
                    console.log('after adding an invite');
                    this.interviewScheduleService.interviewScheduleInterviewId.next(schedule);
                  });
              }
              return InterviewScheduleActions.loadInterviewScheduleDone();
            },
          ),
        )),
    ));

  createInterviewSchedules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewScheduleActions.createRequest),
      mergeMap((action) => this.interviewScheduleService.createInterviewSchedule(action.interviewSchedule)
        .pipe(
          map((response: ServiceResponse<Partial<InterviewSchedule>>) =>
            InterviewScheduleActions.loadInterviewSchedule({interviewSchedule: response.result})),
        )),
    ));

  createInterviewSchedulesInvitation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewScheduleActions.createInvitationRequest),
      mergeMap((action) => this.interviewScheduleService.createInterviewScheduleInvitation(
        action.interviewScheduleInvitation)
        .pipe(
          map((response: ServiceResponse<Partial<InterviewScheduleInvitation>>) => {
            this.interviewScheduleService.interviewScheduleInterviewId.next(response.result);
            return InterviewScheduleActions.loadInvitationRequest({interviewScheduleInvitation: response.result});
          }),
        )),
    ));

  editInterviewSchedules$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InterviewScheduleActions.editRequest),
      mergeMap((action) => this.interviewScheduleService.editInterviewSchedule(action.interviewSchedule)
        .pipe(
          map((response: ServiceResponse<Partial<InterviewSchedule>>) =>
            InterviewScheduleActions.loadInterviewScheduleEdited({interviewSchedule: response.result})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));


  constructor(private actions$: Actions,
              private store: Store,
              private interviewScheduleService: InterviewScheduleService) {
  }
}
