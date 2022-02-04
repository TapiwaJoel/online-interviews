import {createFeatureSelector, createSelector} from '@ngrx/store';
import {InterviewScheduleState, selectAll, selectTotal} from './interview-schedule.reducer';

export const selectInterviewScheduleState = createFeatureSelector<InterviewScheduleState>('interviewSchedules');

export const selectInterviewScheduleById = (interviewScheduleId: string) =>
  createSelector(selectInterviewScheduleState, branchState => branchState.entities[interviewScheduleId]);
export const selectInterviewScheduleLoading = createSelector(selectInterviewScheduleState,
  (interviewScheduleState: InterviewScheduleState) => interviewScheduleState.loading);
export const selectAllInterviewSchedules = createSelector(selectInterviewScheduleState, selectAll);
export const selectAllTotalsInterviewSchedules = createSelector(selectInterviewScheduleState, selectTotal);
