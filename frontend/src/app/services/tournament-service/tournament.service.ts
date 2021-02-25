import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tournament } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  readonly baseUrl = 'http://localhost:3000/tournaments/';
  constructor(private httpClient: HttpClient) { }

  getTournament(id: String) {
    return this.httpClient.get(this.baseUrl + id);
  }

  getTournaments() {
    return this.httpClient.get(this.baseUrl);
  }

  createTournament(tournament: Tournament) {
    return this.httpClient.post(this.baseUrl, tournament);
  }

  saveTournament(tournament: Tournament) {
    return this.httpClient.put(this.baseUrl + tournament._id, tournament);
  }

  addParticipantToTournament(object: any) {
    return this.httpClient.put(this.baseUrl + 'addParticipantToTournament/' + object.tournament._id, object);
  }

  removeParticipantFromTournament(object: any) {
    return this.httpClient.put(this.baseUrl + 'removeParticipantFromTournament/' + object.tournament._id, object);
  }

  cancelTournament(tournament: Tournament) {
    return this.httpClient.put(this.baseUrl + 'cancelTournament/' + tournament._id, tournament);
  }

  deleteTournament(id: String) {
    return this.httpClient.delete(this.baseUrl + id);
  }
}
