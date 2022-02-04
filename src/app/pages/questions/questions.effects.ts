import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../utils/service.response';
import * as QuestionActions from './questions.actions';
import {Question} from './questions.entity';
import {QuestionService} from './questions.services';


@Injectable()
export class QuestionEffects {
  question: Partial<Question>;

  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.loadQuestionRequest),
      mergeMap(() => this.questionService.getQuestions()
        .pipe(
          map((response: ServiceResponse<Partial<Question>[]>) =>
            QuestionActions.loadQuestions({questions: response.result})),
        )),
    ));

  createQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.createRequest),
      mergeMap((action) => this.questionService.createQuestion(action.question)
        .pipe(
          tap(() => console.log('TEST', action.question)),
          map((response: ServiceResponse<Partial<Question>>) =>
            QuestionActions.loadQuestion({question: response.result})),
        )),
    ));

  editQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.editRequest),
      mergeMap((action) => this.questionService.editQuestion(action.question)
        .pipe(
          map((response: ServiceResponse<Partial<Question>>) =>
            QuestionActions.loadQuestionEdited({question: response.result})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private questionService: QuestionService) {
  }
}

