import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl = 'http://localhost:3000/users/';
  constructor(private httpClient: HttpClient) { }

  getUser(id: String) {
    return this.httpClient.get(this.baseUrl + id);
  }

  getUsers() {
    return this.httpClient.get(this.baseUrl);
  }

  getUsersWithIds(ids: Array<String>) {
    return this.httpClient.post(this.baseUrl + 'getUsersWithIds', ids);
  }

  getFreeAgents() {
    return this.httpClient.post(this.baseUrl + 'noTeam', null);
  }

  saveUser(user: User) {
    return this.httpClient.put(this.baseUrl + user._id, user);
  }

  addToTeam(object: any) {
    return this.httpClient.put(this.baseUrl + 'addToTeam/' + object.user._id, object);
  }

  removeFromTeam(user: User) {
    return this.httpClient.put(this.baseUrl + 'removeFromTeam/' + user._id, user);
  }

  receiveTeamInvite(object: any) {
    return this.httpClient.put(this.baseUrl + 'receiveInviteFromTeam/' + object.user._id, object);
  }

  deactivateUser(user: User) {
    return this.httpClient.put(this.baseUrl + 'deactivate/' + user._id, user);
  }

  deleteIncomingInvite(object: any) {
    return this.httpClient.put(this.baseUrl + 'deleteIncomingInvite/' + object.user._id, object);
  }

  newUnreadNotification(object: any) {
    return this.httpClient.put(this.baseUrl + 'newUnreadNotification/' + object.user._id, object);
  }

  readNotification(object: any) {
    return this.httpClient.put(this.baseUrl + 'readNotification/' + object.user._id, object);
  }
}
