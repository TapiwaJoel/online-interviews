import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as SectionActions from './section.actions';
import {Section} from './section.entity';

export interface SectionState extends EntityState<Partial<Section>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Section>> = createEntityAdapter<Section>({
  selectId: (section: Section) => section.id,
});

export const initialSectionState: SectionState = adapter.getInitialState({
  loading: false,
});

export const sectionReducer = createReducer(
  initialSectionState,
  on(SectionActions.loadSectionRequest, state => ({...state, loading: true})),
  on(SectionActions.loadSections, (state, action) => {
    return adapter.upsertMany(action.sections, {...state, loading: false});
  }),
  on(SectionActions.loadSection, (state, action) => {
    return adapter.upsertOne(action.section, {...state, loading: false});
  }),
  on(SectionActions.loadSectionEdited, (state, action) => {
    return adapter.upsertOne(action.section, {...state, loading: false});
  }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

