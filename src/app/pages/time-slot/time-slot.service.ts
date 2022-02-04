import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {TimeSlot} from './time-slot.entity';

@Injectable({
  providedIn: 'root',
})
export class TimeSlotService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  getTimeSlots() {
    const pathUrl = '/schedule/timeslot?pageNo=0&pageSize=1000&sortBy=id';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createTimeSlot(section: Partial<TimeSlot>) {
    const pathUrl = '/schedule/timeslot/';
    return this.http.post(this.config.apiUrl + pathUrl, section);
  }

  editTimeSlot(section: Partial<TimeSlot>) {
    const pathUrl = '/schedule/timeslot/';
    return this.http.put(this.config.apiUrl + pathUrl + section.id, section);
  }
}

