import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../utils/service.response';
import * as TimeSlotActions from './time-slot.actions';
import {TimeSlot} from './time-slot.entity';
import {TimeSlotService} from './time-slot.service';

@Injectable()
export class TimeSlotEffects {
  timeSlot: Partial<TimeSlot>;

  loadTimeSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeSlotActions.loadTimeSlotRequest),
      mergeMap(() => this.timeSlotService.getTimeSlots()
        .pipe(
          map((response: ServiceResponse<Partial<TimeSlot>[]>) =>
            TimeSlotActions.loadTimeSlots({timeSlots: response.result})),
        )),
    ));

  createTimeSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeSlotActions.createRequest),
      mergeMap((action) => this.timeSlotService.createTimeSlot(action.timeSlot)
        .pipe(
          tap(() => console.log('TEST', action.timeSlot)),
          map((response: ServiceResponse<Partial<TimeSlot>>) =>
            TimeSlotActions.loadTimeSlot({timeSlot: response.result})),
        )),
    ));

  editTimeSlots$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TimeSlotActions.editRequest),
      mergeMap((action) => this.timeSlotService.editTimeSlot(action.timeSlot)
        .pipe(
          map((response: ServiceResponse<Partial<TimeSlot>>) =>
            TimeSlotActions.loadTimeSlotEdited({timeSlot: response.result})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private timeSlotService: TimeSlotService) {
  }
}

