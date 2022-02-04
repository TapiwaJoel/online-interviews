import {createAction, props} from '@ngrx/store';
import {Question} from './questions.entity';


export const loadQuestionRequest = createAction(
  '[Question] Load Request',
);

export const createRequest = createAction(
  '[Question] Create',
  props<{ question: Partial<Question> }>(),
);

export const editRequest = createAction(
  '[Question] Edit',
  props<{ question: Partial<Question> }>(),
);

export const loadQuestion = createAction(
  '[Question] Created',
  props<{ question: Partial<Question> }>(),
);

export const loadQuestionEdited = createAction(
  '[Question] Edited',
  props<{ question: Partial<Question> }>(),
);

export const loadQuestions = createAction(
  '[Question] Loaded',
  props<{ questions: Partial<Question>[] }>(),
);
