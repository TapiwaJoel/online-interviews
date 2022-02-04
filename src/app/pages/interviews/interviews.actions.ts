import {createAction, props} from '@ngrx/store';
import {Interview} from './interviews.entity';

export const loadInterviewRequest = createAction(
  '[Interview] Load Request',
);

export const createRequest = createAction(
  '[Interview] Create',
  props<{ interview: Partial<Interview> }>(),
);

export const editRequest = createAction(
  '[Interview] Edit',
  props<{ interview: Partial<Interview> }>(),
);

export const loadInterview = createAction(
  '[Interview] Created',
  props<{ interview: Partial<Interview> }>(),
);

export const loadInterviewEdited = createAction(
  '[Interview] Edited',
  props<{ interview: Partial<Interview> }>(),
);

export const loadInterviews = createAction(
  '[Interview] Loaded',
  props<{ interviews: Partial<Interview>[] }>(),
);
