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
    return this.httpClient.post(this.baseUrl + tournament._id, tournament);
  }

  deleteTournament(id: String) {
    return this.httpClient.delete(this.baseUrl + id);
  }
}
