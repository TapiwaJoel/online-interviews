import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Question} from './questions.entity';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  getQuestions() {
    const pathUrl = '/library/questions?pageNo=0&pageSize=1000&sortBy=id';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createQuestion(question: Partial<Question>) {
    const pathUrl = '/library/question/';
    return this.http.post(this.config.apiUrl + pathUrl, question);
  }

  editQuestion(question: Partial<Question>) {
    const pathUrl = '/library/question/';
    return this.http.put(this.config.apiUrl + pathUrl + question.id, question);
  }
}

