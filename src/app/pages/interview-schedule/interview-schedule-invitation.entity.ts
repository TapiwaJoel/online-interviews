import {TimeSlot} from '../time-slot/time-slot.entity';
import {User} from '../users/users.entity';
import {InterviewSchedule} from './interview-schedule.entity';

export interface InterviewScheduleInvitation {
  id: string;
  interviewSchedule: Partial<InterviewSchedule>;
  timeSlot: Partial<TimeSlot>;
  user: Partial<User>;
  interviewScheduleId: string;
  timeSlotId: string;
  userId: string;
}
