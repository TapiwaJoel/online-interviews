import {createFeatureSelector, createSelector} from '@ngrx/store';
import {JobState, selectAll, selectTotal} from './job.reducer';

export const selectJobState = createFeatureSelector<JobState>('jobs');

export const selectJobById = (jobId: string) =>
  createSelector(selectJobState, jobState => jobState.entities[jobId]);
export const selectJobLoading = createSelector(selectJobState,
  (jobState: JobState) => jobState.loading);
export const selectAllJobs = createSelector(selectJobState, selectAll);
export const selectAllTotalsJobs = createSelector(selectJobState, selectTotal);
