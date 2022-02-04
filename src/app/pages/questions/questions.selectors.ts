import {createFeatureSelector, createSelector} from '@ngrx/store';
import {QuestionState, selectAll, selectTotal} from './questions.reducer';

export const selectQuestionState = createFeatureSelector<QuestionState>('questions');

export const selectQuestionById = (questionId: string) =>
  createSelector(selectQuestionState, branchState => branchState.entities[questionId]);
export const selectQuestionLoading = createSelector(selectQuestionState,
  (branchState: QuestionState) => branchState.loading);
export const selectAllQuestions = createSelector(selectQuestionState, selectAll);
export const selectAllTotalsQuestions = createSelector(selectQuestionState, selectTotal);
