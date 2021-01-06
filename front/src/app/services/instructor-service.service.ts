import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InstructorService {
  constructor(private http: HttpClient) {}

  addInstructor(user: any) {
    return this.http.post('http://localhost:3000/api/newinstructor', user);
  }

  findInstructor(email: string) {
    return this.http.get('http://localhost:3000/api/instructoremail/' + email);
  }
}
