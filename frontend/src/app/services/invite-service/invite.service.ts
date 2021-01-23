import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invite } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InviteService {
  readonly baseUrl = 'http://localhost:3000/invite/';
  constructor(private httpClient: HttpClient) { }

  createInviteForUser(object: any) {
    return this.httpClient.post(this.baseUrl, object);
  }

  inviteOpened(id: String) {
    return this.httpClient.put(this.baseUrl + 'inviteOpened/' + id, null);
  }

  inviteResponse(id: String) {
    return this.httpClient.put(this.baseUrl + 'inviteResponse/' + id, null);
  }
}
