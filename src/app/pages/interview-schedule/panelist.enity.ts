import {TimeSlot} from '../time-slot/time-slot.entity';
import {User} from '../users/users.entity';
import {InterviewSchedule} from './interview-schedule.entity';

export interface Panelist {
  id: string;
  status: string;
  interviewSchedule: Partial<InterviewSchedule>;
  user: Partial<User>;
  timeslot: Partial<TimeSlot>;
}
