import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as TimeSlotActions from './time-slot.actions';
import {TimeSlot} from './time-slot.entity';

export interface TimeSlotState extends EntityState<Partial<TimeSlot>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<TimeSlot>> = createEntityAdapter<TimeSlot>({
  selectId: (timeSlot: TimeSlot) => timeSlot.id,
});

export const initialTimeSlotState: TimeSlotState = adapter.getInitialState({
  loading: false,
});

export const timeSlotReducer = createReducer(
  initialTimeSlotState,
  on(TimeSlotActions.loadTimeSlotRequest, state => ({...state, loading: true})),
  on(TimeSlotActions.loadTimeSlots, (state, action) => {
    return adapter.upsertMany(action.timeSlots, {...state, loading: false});
  }),
  on(TimeSlotActions.loadTimeSlot, (state, action) => {
    return adapter.upsertOne(action.timeSlot, {...state, loading: false});
  }),
  on(TimeSlotActions.loadTimeSlotEdited, (state, action) => {
    return adapter.upsertOne(action.timeSlot, {...state, loading: false});
  }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

