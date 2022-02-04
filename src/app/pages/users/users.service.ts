import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../utils/config';
import {User} from './users.entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config,
              private http: HttpClient) {
  }

  getUsers() {
    const pathUrl = '/account/users?pageNo=0&pageSize=1000&sortBy=id';
    return this.http.get(this.config.apiUrl + pathUrl);
  }

  createUser(user: Partial<User>) {
    const pathUrl = '/account/user/';
    return this.http.post(this.config.apiUrl + pathUrl, user);
  }

  editUser(user: Partial<User>) {
    const pathUrl = '/account/user/';
    return this.http.put(this.config.apiUrl + pathUrl + user.id, user);
  }
}

