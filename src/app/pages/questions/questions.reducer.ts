import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as QuestionActions from './questions.actions';
import {Question} from './questions.entity';

export interface QuestionState extends EntityState<Partial<Question>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Question>> = createEntityAdapter<Question>({
  selectId: (question: Question) => question.id,
});

export const initialQuestionState: QuestionState = adapter.getInitialState({
  loading: false,
});

export const questionReducer = createReducer(
  initialQuestionState,
  on(QuestionActions.loadQuestionRequest, state => ({...state, loading: true})),
  on(QuestionActions.loadQuestions, (state, action) => {
    return adapter.upsertMany(action.questions, {...state, loading: false});
  }),
  on(QuestionActions.loadQuestion, (state, action) => {
    return adapter.upsertOne(action.question, {...state, loading: false});
  }),
  on(QuestionActions.loadQuestionEdited, (state, action) => {
    return adapter.upsertOne(action.question, {...state, loading: false});
  }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

