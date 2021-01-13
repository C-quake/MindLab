import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  http: HttpClient;
  urlApi = 'http://localhost:3000/api/sendemail';
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  sendService(to: string, subject: string, description: string) {
    const body = new FormData();
    body.append('to', to);
    body.append('subject', subject);
    body.append('description', description);
    return this.http.post(this.urlApi, body);
  }
}
