import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as InterviewScheduleActions from './interview-schedule.actions';
import {InterviewSchedule} from './interview-schedule.entity';

export interface InterviewScheduleState extends EntityState<Partial<InterviewSchedule>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<InterviewSchedule>> = createEntityAdapter<InterviewSchedule>({
  selectId: (interviewSchedule: InterviewSchedule) => interviewSchedule.id,
});

export const initialInterviewScheduleState: InterviewScheduleState = adapter.getInitialState({
  loading: false,
});

export const interviewScheduleReducer = createReducer(
  initialInterviewScheduleState,
  on(InterviewScheduleActions.loadInterviewScheduleRequest, state => ({...state, loading: true})),
  on(InterviewScheduleActions.loadInterviewSchedulePanelistsRequest, state => ({...state, loading: true})),
  on(InterviewScheduleActions.loadInterviewSchedules, (state, action) => {
    return adapter.upsertMany(action.interviewSchedules, {...state, loading: false});
  }),
  on(InterviewScheduleActions.loadInterviewSchedule, (state, action) => {
    console.log('action.interviewSchedule', action.interviewSchedule);
    return adapter.upsertOne(action.interviewSchedule, {...state, loading: false});
  }),
  on(InterviewScheduleActions.loadInterviewScheduleEdited, (state, action) => {
    return adapter.upsertOne(action.interviewSchedule, {...state, loading: false});
  }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

