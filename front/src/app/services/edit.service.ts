import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  http: HttpClient;
  urlApi = 'http://localhost:3000/api/update/course/';
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  updateService(
    id:string,
    IdInstructor: string,
    title: string,
    description: string,
    pdf: any,
    video: any,
    category: string,
    type:string,
    price: string ,){
    const body = new FormData();
    body.append('IdInstructor', IdInstructor);
    body.append('title', title);
    body.append('description', description);
    body.append('file', pdf);
    body.append('file', video);
    body.append('category', category);
    body.append('type', type);
    body.append('price', price);



    return this.http.put('http://localhost:3000/api/update/course/'+id, body);
  }
  getcoursebyid(id:string){
     return this.http.get('http://localhost:3000/api/course/'+id)
  }
}
