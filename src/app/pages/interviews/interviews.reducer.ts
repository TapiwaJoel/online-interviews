import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import {loadInterviews} from './interviews.actions';
import * as InterviewActions from './interviews.actions';
import {Interview} from './interviews.entity';

export interface InterviewState extends EntityState<Partial<Interview>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Interview>> = createEntityAdapter<Interview>({
  selectId: (interview: Interview) => interview.id,
});

export const initialInterviewState: InterviewState = adapter.getInitialState({
  loading: false,
});

export const interviewReducer = createReducer(
  initialInterviewState,
  on(InterviewActions.loadInterviewRequest, state => ({...state, loading: true})),
  on(InterviewActions.loadInterviews, (state, action) => {
    return adapter.upsertMany(action.interviews, {...state, loading: false});
  }),
  on(InterviewActions.loadInterview, (state, action) => {
    return adapter.upsertOne(action.interview, {...state, loading: false});
  }),
  on(InterviewActions.loadInterviewEdited, (state, action) => {
    return adapter.upsertOne(action.interview, {...state, loading: false});
  }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

