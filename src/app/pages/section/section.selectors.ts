import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SectionState, selectAll, selectTotal} from './section.reducer';

export const selectSectionState = createFeatureSelector<SectionState>('sections');

export const selectSectionById = (sectionId: string) =>
  createSelector(selectSectionState, branchState => branchState.entities[sectionId]);
export const selectSectionLoading = createSelector(selectSectionState,
  (branchState: SectionState) => branchState.loading);
export const selectAllSections = createSelector(selectSectionState, selectAll);
export const selectAllTotalsSections = createSelector(selectSectionState, selectTotal);
