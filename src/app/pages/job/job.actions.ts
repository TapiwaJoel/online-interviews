import {createAction, props} from '@ngrx/store';
import {Job} from './job.entity';

export const loadJobRequest = createAction(
  '[Job] Load Request',
);

export const createRequest = createAction(
  '[Job] Create',
  props<{ job: Partial<Job> }>(),
);

export const editRequest = createAction(
  '[Job] Edit',
  props<{ job: Partial<Job> }>(),
);

export const loadJob = createAction(
  '[Job] Created',
  props<{ job: Partial<Job> }>(),
);

export const loadJobEdited = createAction(
  '[Job] Edited',
  props<{ job: Partial<Job> }>(),
);

export const loadJobs = createAction(
  '[Job] Loaded',
  props<{ jobs: Partial<Job>[] }>(),
);
