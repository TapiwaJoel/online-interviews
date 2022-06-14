import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Job} from './job.entity';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  getJobs() {
    const pathUrl = '/library/job-title?pageNo=0&pageSize=1000&sortBy=id';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createJob(job: Partial<Job>) {
    const pathUrl = '/library/job-title/';
    return this.http.post(this.config.apiUrl + pathUrl, job);
  }

  editJob(job: Partial<Job>) {
    const pathUrl = '/library/job-title/';
    return this.http.put(this.config.apiUrl + pathUrl + job.id, job);
  }
}

