import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  http: HttpClient;
  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }
addService(courseId:string, commenterId: string,
  commenterUsername: string,
  text: string){
      const body={
        commenterId: commenterId,
        commenterUsername: commenterUsername,
        text:text
      }
     return this.http.patch(`http://localhost:3000/api/course/comment/${courseId}`,body)
}
deleteService(id:any,commentId:any){
  console.log("commentId",commentId)
  console.log("courseId",id) 
   return this.http.patch(`http://localhost:3000/api/course/delete-comment/${id}`,  { commentId })
}

editService(id:any,commentId:any,text:string){
  console.log("commentId",commentId)
  console.log("courseId",id) 
   return this.http.patch(`http://localhost:3000/api/course/edit/${id}`,  { commentId,text })
}
addRateService(id:any,raterId:any,rates:any){
  return this.http.patch(`http://localhost:3000/api/course/rate/${id}`,  { raterId,rates })

}
editRateService(id:any,rateId:any,rates:any){
  return this.http.patch(`http://localhost:3000/api/course/edit-rate/${id}`,  { rateId,rates })

}

}
