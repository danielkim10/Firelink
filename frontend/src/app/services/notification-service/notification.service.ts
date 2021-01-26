import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  readonly baseUrl = 'http://localhost:3000/notifications/';
  constructor(private httpClient: HttpClient) { }

  createNotification(notification: Notification) {
    return this.httpClient.post(this.baseUrl, notification);
  }
}
