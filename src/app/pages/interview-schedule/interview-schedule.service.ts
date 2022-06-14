import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Interview} from '../interviews/interviews.entity';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {InterviewScheduleInvitation} from './interview-schedule-invitation.entity';
import {InterviewSchedule} from './interview-schedule.entity';
import {Score} from './score.entity';


@Injectable({
  providedIn: 'root',
})
export class InterviewScheduleService {
  interview: Partial<Interview>;
  candidates = [];
  interviewScheduleInterviewId = new BehaviorSubject<Partial<InterviewSchedule>>({});

  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  setInterview(interview: Partial<Interview>) {
    this.interview = interview;
  }

  getInterview() {
    return this.interview;
  }

  getInterviewSchedules() {
    const pathUrl = '/interview/interview-schedule?pageNo=0&pageSize=1000&sortBy=id';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createInterviewSchedule(interviewSchedule: Partial<InterviewSchedule>) {
    const pathUrl = '/interview/schedule-interview';
    return this.http.post(this.config.apiUrl + pathUrl, interviewSchedule);
  }

  addQuestionToInterviewSchedule(interviewSchedule: { interviewScheduleId: string, questionId: string }) {
    const pathUrl = '/library/question-interview';
    return this.http.post<any>(this.config.apiUrl + pathUrl, interviewSchedule);
  }

  loadInterviewSchedulePanelistsRequest(id: string, role: string) {
    const pathUrl = `/interview/schedule-id/${id}/role/${role}`;
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  loadSectionQuestions(sectionId: string) {
    const pathUrl = `/library/question-search-section/${sectionId}`;
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  loadScheduledInterviewQuestions(interviewScheduleId: string) {
    const pathUrl = `/library/question-search/${interviewScheduleId}`;
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createInterviewScheduleInvitation(interviewScheduleInvitation: Partial<InterviewScheduleInvitation>) {
    const pathUrl = '/interview/invitation';
    return this.http.post(this.config.apiUrl + pathUrl, interviewScheduleInvitation);
  }

  editInterviewSchedule(interviewSchedule: Partial<InterviewSchedule>) {
    const pathUrl = '/interview/';
    return this.http.put(this.config.apiUrl + pathUrl + interviewSchedule.id, interviewSchedule);
  }

  getRefCheckById(id: string) {
    const pathUrl = '/candidate/application-search?id=';
    return this.http.get(this.config.apiUrl + pathUrl + id);
  }

  postScores(body: Partial<Score>) {
    const pathUrl = '/interview/score-card';
    return this.http.post(this.config.apiUrl + pathUrl, body);
  }

  addRefCheck(body) {
    const pathUrl = 'http://192.168.104.99:8819/api/candidate/reference-checks';
    return this.http.post(pathUrl, body);
  }

  checkValidate(token: string) {
    const pathUrl = '/account/validate-user/';
    return this.http.get(this.config.apiUrl + pathUrl + token);
  }

  getScoresByInterviewSchedule(id: string) {
    const pathUrl = '/interview/score-card/interview-schedule-id/';
    return this.http.get(this.config.apiUrl + pathUrl + id);
  }

  getCandidate(id: string) {
    const pathUrl = '/candidate/application-search?id=';
    return this.http.get(this.config.apiUrl + pathUrl + id);
  }
}
