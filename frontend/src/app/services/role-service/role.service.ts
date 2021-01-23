import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../models';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  readonly baseUrl = 'http://localhost:3000/roles/';
  constructor(private httpClient: HttpClient) { }

  getRoles() {
    return this.httpClient.get(this.baseUrl);
  }

  getRole(id: String) {
    return this.httpClient.get(this.baseUrl + id);
  }

  getAdminRoles(bool: Boolean) {
    return this.httpClient.post(this.baseUrl + 'admin', {admin: bool});
  }
}
