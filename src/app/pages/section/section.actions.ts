import {createAction, props} from '@ngrx/store';
import {Section} from './section.entity';

export const loadSectionRequest = createAction(
  '[Section] Load Request',
);

export const createRequest = createAction(
  '[Section] Create',
  props<{ section: Partial<Section> }>(),
);

export const editRequest = createAction(
  '[Section] Edit',
  props<{ section: Partial<Section> }>(),
);

export const loadSection = createAction(
  '[Section] Created',
  props<{ section: Partial<Section> }>(),
);

export const loadSectionEdited = createAction(
  '[Section] Edited',
  props<{ section: Partial<Section> }>(),
);

export const loadSections = createAction(
  '[Section] Loaded',
  props<{ sections: Partial<Section>[] }>(),
);
