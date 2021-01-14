import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User {
  _id: String,
  username: String,
  email: String,
  role: String,
  description: String,
  summonerName: String,
  displayName: String,
  teamID: String,
  previousTeamIDs: Array<String>,
  recentTournaments: Array<String>,
  recentMatches: Array<String>,
  active: Boolean,
  freeAgent: Boolean,
}

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  readonly baseUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(this.baseUrl + '/users/');
  }
}
