import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserProfile } from './user-profile.model';

export interface User {
  _id: String,
  username: String,
  email: String,
  role: any,
  description: String,
  summonerName: String,
  displayName: String,
  teamID: any,
  previousTeamIDs: Array<any>,
  recentTournaments: Array<any>,
  recentMatches: Array<any>,
  incomingNotifications: Array<any>,
  incomingInvites: Array<any>,
  active: Boolean,
  freeAgent: Boolean,
}

export interface Role {
  _id: String,
  name: String,
}

export interface Team {
  _id: String,
  name: String,
  tag: String,
  logo: String,
  owner: String,
  managers: Array<any>,
  outgoingInvites: Array<any>,
}

export interface Invite {
  _id: String,
  sender: any,
  recipient: any,
  subject: String,
  message: String,
  responseReceived: Boolean,
  opened: Boolean,
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  readonly baseUrl = 'http://localhost:3000'
  userProfile: UserProfile;
  user: User;
  constructor(private httpClient: HttpClient) { }


  getUser(id: String) {
    return this.httpClient.get(this.baseUrl + '/users/' + id);
  }

  getFreeAgents() {
    return this.httpClient.post(this.baseUrl + '/users/noTeam', null);
  }

  getRoles() {
    return this.httpClient.get(this.baseUrl + '/roles');
  }

  getRole(id: String) {
    return this.httpClient.get(this.baseUrl + '/roles/' + id);
  }

  getAdminRoles(variable: Boolean) {
    return this.httpClient.post(this.baseUrl + '/roles/admin', {admin: variable});
  }
  
  getTeam(id: String) {
    return this.httpClient.get(this.baseUrl + '/teams/' + id);
  }

  getTeams(ids: Array<String>) {
    return this.httpClient.post(this.baseUrl + '/teams/getTeamsWithIds', ids);
  }

  saveUser(user: User) {
    return this.httpClient.put(this.baseUrl + '/users/' + user._id, user);
  }

  deactivateUser(user: User) {
    return this.httpClient.put(this.baseUrl + '/users/deactivate/' + user._id, user);
  }

  inviteOpened(inviteId: String) {
    return this.httpClient.put(this.baseUrl + '/invite/inviteOpened/' + inviteId, null);
  }

  inviteResponse(inviteId: String) {
    return this.httpClient.put(this.baseUrl + '/invite/inviteResponse/' + inviteId, null);
  }

  deleteIncomingInvite(object: any) {
    return this.httpClient.put(this.baseUrl + '/users/deleteIncomingInvite/' + object.user._id, object);
  }

  deleteOutgoingInvite(object: any) {
    return this.httpClient.put(this.baseUrl + '/teams/deleteOutgoingInvite/' + object.team._id, object);
  }
}
