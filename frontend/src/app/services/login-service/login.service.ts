import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public login:Login = {
    username: '',
    password: '',
  };
  readonly baseURL = 'http://localhost:3000/users/login/';

  constructor(private httpClient: HttpClient) { }

  userLogin(login: Login) {
    return this.httpClient.post(this.baseURL, login);
  }
}
