import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Team } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  readonly baseUrl = 'http://localhost:3000/teams/';
  constructor(private httpClient: HttpClient) { }

  getTeam(id: String) {
    return this.httpClient.get(this.baseUrl + id);
  }

  getTeamByOwner(id: String) {
    return this.httpClient.post(this.baseUrl + 'teamOwner', id);
  }

  getTeams() {
    return this.httpClient.get(this.baseUrl);
  }

  getTeamsWithIds(ids: Array<String>) {
    return this.httpClient.post(this.baseUrl + 'getTeamsWithIds', ids);
  }

  createTeam(object: any) {
    return this.httpClient.post(this.baseUrl, object);
  }

  editTeam(team: Team) {
    return this.httpClient.put(this.baseUrl + team._id, team);
  }

  leaveTeam(object: any) {
    return this.httpClient.put(this.baseUrl + 'leave/' + object.team._id, object);
  }
  
  addMember(object: any) {
    return this.httpClient.put(this.baseUrl + 'addMember/' + object.team._id, object);
  }

  teamSendsInvite(object: any) {
    return this.httpClient.put(this.baseUrl + 'createInviteForTeam/' + object.team._id, object);
  }

  deleteOutgoingInvite(object: any) {
    return this.httpClient.put(this.baseUrl + 'deleteOutgoingInvite/' + object.team._id, object);
  }

  changeStatus(object: any) {
    return this.httpClient.put(this.baseUrl + 'promote/' + object.team._id, object);
  }

  disbandTeam(team: Team) {
    return this.httpClient.put(this.baseUrl + 'disband/' + team._id, team);
  }
}
