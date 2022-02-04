import {createAction, props} from '@ngrx/store';
import {TimeSlot} from './time-slot.entity';

export const loadTimeSlotRequest = createAction(
  '[TimeSlot] Load Request',
);

export const createRequest = createAction(
  '[TimeSlot] Create',
  props<{ timeSlot: Partial<TimeSlot> }>(),
);

export const editRequest = createAction(
  '[TimeSlot] Edit',
  props<{ timeSlot: Partial<TimeSlot> }>(),
);

export const loadTimeSlot = createAction(
  '[TimeSlot] Created',
  props<{ timeSlot: Partial<TimeSlot> }>(),
);

export const loadTimeSlotEdited = createAction(
  '[TimeSlot] Edited',
  props<{ timeSlot: Partial<TimeSlot> }>(),
);

export const loadTimeSlots = createAction(
  '[TimeSlot] Loaded',
  props<{ timeSlots: Partial<TimeSlot>[] }>(),
);
