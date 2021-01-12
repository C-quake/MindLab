import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewCourseService {
  http: HttpClient;
  urlApi = 'http://localhost:3000/api/newCourse';
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  addService(
    IdInstructor: string,
    title: string,
    description: string,
    pdf: any,
    video: any,
    selectedOption: string,
    type: string,
    price: string
  ) {
    const body = new FormData();
    body.append('IdInstructor', IdInstructor);
    body.append('title', title);
    body.append('description', description);
    body.append('file', pdf);
    body.append('file', video);
    body.append('category', selectedOption);
    body.append('type', type);
    body.append('price', price);

    return this.http.post(this.urlApi, body);
  }
}
