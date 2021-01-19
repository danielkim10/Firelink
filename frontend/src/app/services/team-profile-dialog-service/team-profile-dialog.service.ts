import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  _id: String;
  username: String;
  role: String;
  teamID: any;
}

export interface Team {
  _id: String;
  name: String;
  tag: String;
  logo: String;
  owner: any;
  managers: Array<String>;
  playerRoster: Array<String>;
  coachRoster: Array<String>;
  active: Boolean;
  matchHistory: Array<String>;
  tournamentHistory: Array<String>;
  activelyRecruiting: Boolean;
  dateCreated: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TeamProfileDialogService {
  readonly baseUrl = "http://localhost:3000";
  constructor(private httpClient: HttpClient) { }

  updateUser(user: User) {
    return this.httpClient.put(this.baseUrl + '/users/addToTeam/' + user._id, user);
  }

  addMember(object: any) {
    return this.httpClient.put(this.baseUrl + '/teams/addMember/' + object.team._id, object);
  }

  inviteMember(object: any) {

  }

  changeStatus(object: any) {

  }

  transferOwnership(object: any) {

  }

  leaveTeam() {

  }

  disbandTeam() {

  }
}
