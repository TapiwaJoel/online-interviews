import {createFeatureSelector, createSelector} from '@ngrx/store';
import {TimeSlotState, selectAll, selectTotal} from './time-slot.reducer';

export const selectTimeSlotState = createFeatureSelector<TimeSlotState>('timeSlots');

export const selectTimeSlotById = (timeSlotId: string) =>
  createSelector(selectTimeSlotState, branchState => branchState.entities[timeSlotId]);
export const selectTimeSlotLoading = createSelector(selectTimeSlotState,
  (branchState: TimeSlotState) => branchState.loading);
export const selectAllTimeSlots = createSelector(selectTimeSlotState, selectAll);
export const selectAllTotalsTimeSlots = createSelector(selectTimeSlotState, selectTotal);
