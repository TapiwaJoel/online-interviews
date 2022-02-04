import {Interview} from '../interviews/interviews.entity';
import {Question} from '../questions/questions.entity';
import {User} from '../users/users.entity';
import {Panelist} from './panelist.enity';

export interface InterviewSchedule {
  id: string;
  name: string;
  interview: Partial<Interview>;
  interviewIdId: string;
  dateOfInterview: string;
  panelists: Partial<Panelist>[];
  candidates: Partial<User>[];
  questions: Partial<Question>[];
  status: string;
  created: string;
  updated: string;
}
