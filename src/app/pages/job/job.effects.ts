import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../utils/service.response';
import * as JobActions from './job.actions';
import {Job} from './job.entity';
import {JobService} from './job.service';

@Injectable()
export class JobEffects {
  job: Partial<Job>;

  loadJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.loadJobRequest),
      mergeMap(() => this.jobService.getJobs()
        .pipe(
          map((response: ServiceResponse<Partial<Job>[]>) =>
            JobActions.loadJobs({jobs: response.result})),
        )),
    ));

  createJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.createRequest),
      mergeMap((action) => this.jobService.createJob(action.job)
        .pipe(
          map((response: ServiceResponse<Partial<Job>>) =>
            JobActions.loadJob({job: response.result})),
        )),
    ));

  editJobs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JobActions.editRequest),
      mergeMap((action) => this.jobService.editJob(action.job)
        .pipe(
          map((response: ServiceResponse<Partial<Job>>) =>
            JobActions.loadJobEdited({job: response.result})),
          tap((ev) => console.log('TEST', ev)),
        )),
    ));

  constructor(private actions$: Actions,
              private jobService: JobService) {
  }
}

