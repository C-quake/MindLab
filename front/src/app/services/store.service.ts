import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  courses: any;
  http: HttpClient;
  urlApi = 'http://localhost:3000/api/allcourses';

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  getService(): Observable<any> {
    return this.http.get(this.urlApi);
  }

  getCourseById(id: string) {
    return this.http.get('http://localhost:3000/api/course/' + id);
  }

  deleteService(id: String) {
    return this.http.delete('http://localhost:3000/api/course/' + id);
  }

  getCoursesByInstructor(id: any) {
    return this.http.get('http://localhost:3000/api/course/instructor/' + id);
  }
}
