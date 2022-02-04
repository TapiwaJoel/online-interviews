import {createFeatureSelector, createSelector} from '@ngrx/store';
import {InterviewState, selectAll, selectTotal} from './interviews.reducer';

export const selectInterviewState = createFeatureSelector<InterviewState>('interviews');

export const selectInterviewById = (interviewId: string) =>
  createSelector(selectInterviewState, branchState => branchState.entities[interviewId]);
export const selectInterviewLoading = createSelector(selectInterviewState,
  (interviewState: InterviewState) => interviewState.loading);
export const selectAllInterviews = createSelector(selectInterviewState, selectAll);
export const selectAllTotalsInterviews = createSelector(selectInterviewState, selectTotal);
