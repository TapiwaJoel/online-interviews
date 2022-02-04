import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Interview} from './interviews.entity';


@Injectable({
  providedIn: 'root',
})
export class InterviewService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  getInterviews() {
    const pathUrl = '/interview?pageNo=0&pageSize=1000&sortBy=id';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createInterview(interview: Partial<Interview>) {
    const pathUrl = '/interview/';
    return this.http.post(this.config.apiUrl + pathUrl, interview);
  }

  editInterview(interview: Partial<Interview>) {
    const pathUrl = '/interview/';
    return this.http.put(this.config.apiUrl + pathUrl + interview.id, interview);
  }
}
