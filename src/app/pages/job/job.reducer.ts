import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as JobActions from './job.actions';
import {Job} from './job.entity';

export interface JobState extends EntityState<Partial<Job>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Job>> = createEntityAdapter<Job>({
  selectId: (job: Job) => job.id,
});

export const initialJobState: JobState = adapter.getInitialState({
  loading: false,
});

export const jobReducer = createReducer(
  initialJobState,
  on(JobActions.loadJobRequest, state => ({...state, loading: true})),
  on(JobActions.loadJobs, (state, action) => {
    return adapter.upsertMany(action.jobs, {...state, loading: false});
  }),
  on(JobActions.loadJob, (state, action) => {
    return adapter.upsertOne(action.job, {...state, loading: false});
  }),
  on(JobActions.loadJobEdited, (state, action) => {
    return adapter.upsertOne(action.job, {...state, loading: false});
  }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

