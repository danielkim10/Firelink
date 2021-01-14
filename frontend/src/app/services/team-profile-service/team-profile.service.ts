import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  _id: String;
  username: String;
  role: String;
  teamID: String;
}

export interface Team {
  _id: String;
  name: String;
  tag: String;
  logo: String;
  owner: String;
  managers: Array<String>;
  playerRoster: Array<String>;
  coachRoster: Array<String>;
  active: Boolean;
  matchHistory: Array<String>;
  tournamentHistory: Array<String>;
  activelyRecruiting: Boolean;
  dateCreated: Date;
}

export interface Role {
  _id: String;
  name: String;
}

@Injectable({
  providedIn: 'root'
})
export class TeamProfileService {
  readonly baseUrl='http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getUser(id: String) {
    return this.httpClient.get(this.baseUrl + '/users/' + id);
  }

  getFreeAgents() {
    return this.httpClient.post(this.baseUrl + '/users/noTeam', null);
  }
  
  getTeam(id: String) {
    return this.httpClient.get(this.baseUrl + '/teams/' + id);
  }

  getTeamByOwner(id: String) {
    return this.httpClient.post(this.baseUrl + '/teamOwner', id);
  }

  getAdminRoles(variable: Boolean) {
    return this.httpClient.post(this.baseUrl + '/roles/admin', {admin: variable});
  }

  updateUser(user: User) {
    return this.httpClient.put(this.baseUrl + '/users/addToTeam/' + user._id, user);
  }

  createTeam(object: any) {
    return this.httpClient.post(this.baseUrl + '/teams/', object);
  }

  editTeam(team: Team) {
    return this.httpClient.put(this.baseUrl + '/teams/' + team._id, team);
  }

  leaveTeam(object: any) {
    return this.httpClient.put(this.baseUrl + '/teams/leave/' + object.team._id, object);
  }

  removeFromTeam(user: User) {
    return this.httpClient.put(this.baseUrl + '/users/removeFromTeam/' + user._id, user);
  }

  addMember(object: any) {
    return this.httpClient.put(this.baseUrl + '/teams/addMember/' + object.team._id, object);
  }

  inviteMember() {

  }

  disbandTeam(team: Team) {
    return this.httpClient.put(this.baseUrl + '/teams/disband' + team._id, team);
  }
}
