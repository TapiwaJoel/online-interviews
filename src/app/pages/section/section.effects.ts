import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {ServiceResponse} from '../utils/service.response';
import * as SectionActions from './section.actions';
import {Section} from './section.entity';
import {SectionService} from './section.service';

@Injectable()
export class SectionEffects {
  section: Partial<Section>;

  loadSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.loadSectionRequest),
      mergeMap(() => this.sectionService.getSections()
        .pipe(
          map((response: ServiceResponse<Partial<Section>[]>) =>
            SectionActions.loadSections({sections: response.result})),
        )),
    ));

  createSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SectionActions.createRequest),
      mergeMap((action) => this.sectionService.createSection(action.section)
        .pipe(
          map((response: ServiceResponse<Partial<Section>>) =>
            SectionActions.loadSection({section: response.result})),
        )),
    ));

  editSections$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SectionActions.editRequest),
        mergeMap((action) => this.sectionService.editSection(action.section)
          .pipe(
            map((response: ServiceResponse<Partial<Section>>) =>
              SectionActions.loadSectionEdited({section: response.result})),
          )),
      ));

  constructor(private actions$: Actions,
              private sectionService: SectionService) {
  }
}

