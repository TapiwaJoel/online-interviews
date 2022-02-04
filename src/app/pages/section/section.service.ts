import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {Section} from './section.entity';

@Injectable({
  providedIn: 'root',
})
export class SectionService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  getSections() {
    const pathUrl = '/library/section?pageNo=0&pageSize=1000&sortBy=id';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createSection(section: Partial<Section>) {
    const pathUrl = '/library/section/';
    return this.http.post(this.config.apiUrl + pathUrl, section);
  }

  editSection(section: Partial<Section>) {
    const pathUrl = '/library/section/';
    return this.http.put(this.config.apiUrl + pathUrl + section.id, section);
  }
}

