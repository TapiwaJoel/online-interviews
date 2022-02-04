import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';

@Injectable({
  providedIn: 'root',
})
export class PreInterviewFormService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  postPreform(body: any) {
    const pathUrl = '/interview/pre-interview';
    return this.http.post(this.config.apiUrl + pathUrl, body);
  }
}
