import {createAction, props} from '@ngrx/store';
import {InterviewScheduleInvitation} from './interview-schedule-invitation.entity';
import {InterviewSchedule} from './interview-schedule.entity';
import {Panelist} from './panelist.enity';

export const loadInterviewScheduleRequest = createAction(
  '[InterviewSchedule] Load Request',
);

export const loadInterviewScheduleDone = createAction(
  '[InterviewSchedule] Load InterviewScheduleDone',
);

export const loadInterviewSchedulePanelistsRequest = createAction(
  '[InterviewSchedule Panelist] Load Request',
  props<{ id: string, role: string }>(),
);

export const loadInterviewSchedulePanelists = createAction(
  '[InterviewSchedule Panelist] Load',
  props<{ panelists: Partial<Panelist>[] }>(),
);

export const loadInterviewScheduleIntervieweeRequest = createAction(
  '[InterviewSchedule Panelist] Load Request',
);

export const createRequest = createAction(
  '[InterviewSchedule] Create',
  props<{ interviewSchedule: Partial<InterviewSchedule> }>(),
);

export const createInvitationRequest = createAction(
  '[InterviewSchedule Invitation] Create Request',
  props<{ interviewScheduleInvitation: Partial<InterviewScheduleInvitation> }>(),
);

export const loadInvitationRequest = createAction(
  '[InterviewSchedule Invitation] Create Load',
  props<{ interviewScheduleInvitation: Partial<InterviewScheduleInvitation> }>(),
);

export const editRequest = createAction(
  '[InterviewSchedule] Edit',
  props<{ interviewSchedule: Partial<InterviewSchedule> }>(),
);

export const loadInterviewSchedule = createAction(
  '[InterviewSchedule] Created Panelist',
  props<{ interviewSchedule: Partial<InterviewSchedule> }>(),
);

export const loadInterviewScheduleEdited = createAction(
  '[InterviewSchedule] Edited',
  props<{ interviewSchedule: Partial<InterviewSchedule> }>(),
);

export const loadInterviewSchedules = createAction(
  '[InterviewSchedule] Loaded',
  props<{ interviewSchedules: Partial<InterviewSchedule>[] }>(),
);
