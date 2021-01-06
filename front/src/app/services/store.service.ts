import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  http: HttpClient;
  urlApi = 'http://localhost:3000/api/allcourses';

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
  getService(){
    return this.http.get(this.urlApi);
  }
  deleteService(id:String){
    return this.http.delete( 'http://localhost:3000/api/course/'+id)
  }
}
