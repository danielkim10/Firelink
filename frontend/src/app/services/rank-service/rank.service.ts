import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rank } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  readonly baseUrl = 'http://localhost:3000/ranks/'
  constructor(private httpClient: HttpClient) { }

  getRank(id: String) {
    return this.httpClient.get(this.baseUrl + id);
  }

  getRanks() {
    return this.httpClient.get(this.baseUrl);
  }
}
