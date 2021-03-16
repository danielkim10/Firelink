import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Role, Team, TeamMember } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly userUrl = 'http://localhost:3000/users/';
  readonly teamMemberUrl = 'http://localhost:3000/teamMembers/';
  constructor(private httpClient: HttpClient) { }

  getUser(id: String) {
    return this.httpClient.get(this.userUrl + id);
  }

  getUsers() {
    return this.httpClient.get(this.userUrl);
  }

  getUsersWithIds(ids: Array<String>) {
    return this.httpClient.post(this.userUrl + 'getUsersWithIds', ids);
  }

  getFreeAgents() {
    return this.httpClient.post(this.userUrl + 'freeAgents', null);
  }

  getTournamentMasters(role: Role) {
    return this.httpClient.post(this.userUrl + 'tournamentMasters', role);
  }

  saveUser(user: User) {
    return this.httpClient.put(this.userUrl + user._id, user);
  }

  createTeamMember(user: User, team: Team) {
    return this.httpClient.post(this.teamMemberUrl, {user: user, team: team});
  }

  addToTeam(object: any) {
    return this.httpClient.put(this.userUrl + 'addToTeam/' + object.user._id, object);
  }

  removeFromTeam(user: User) {
    return this.httpClient.put(this.userUrl + 'removeFromTeam/' + user._id, user);
  }

  receiveTeamInvite(object: any) {
    return this.httpClient.put(this.userUrl + 'receiveInviteFromTeam/' + object.user._id, object);
  }

  deactivateUser(user: User) {
    return this.httpClient.put(this.userUrl + 'deactivate/' + user._id, user);
  }

  deleteIncomingInvite(object: any) {
    return this.httpClient.put(this.userUrl + 'deleteIncomingInvite/' + object.user._id, object);
  }

  newUnreadNotification(object: any) {
    return this.httpClient.put(this.userUrl + 'newUnreadNotification/' + object.user._id, object);
  }

  readNotification(object: any) {
    return this.httpClient.put(this.userUrl + 'readNotification/' + object.user._id, object);
  }
}
