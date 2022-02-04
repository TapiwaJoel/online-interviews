import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Config, CONFIG_TOKEN} from '../pages/utils/config';


@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  constructor(@Inject(CONFIG_TOKEN) private config: Config, private http: HttpClient) {
  }

  credentials(body: { username: string, password: string }) {
    return this.http.post(this.config.apiUrl + '/account/user-credentials', body);
  }

  validate(pin: string) {
    return this.http.get(this.config.apiUrl + `/validate/${pin}`);
  }

  login(body: { username: string, password: string }) {
    return this.http.post(this.config.apiUrl + '/token', body);
  }
}
