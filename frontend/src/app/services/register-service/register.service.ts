import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { Register } from './register.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public register:Register = {
    id: uuidv4(),
    userID: 1,
    username: '',
    email: '',
    password: '',
    active: true,
  };
  readonly url = 'http://localhost:3000/users'

  constructor(private httpClient: HttpClient) { }

  registerNew(register: Register) {
    return this.httpClient.post(this.url, register);
  }
}
