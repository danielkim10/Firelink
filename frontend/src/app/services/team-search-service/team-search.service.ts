import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

@Injectable({
  providedIn: 'root'
})
export class TeamSearchService {
  readonly baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getTeams() {
    return this.httpClient.get(this.baseUrl + '/teams/');
  }
}
