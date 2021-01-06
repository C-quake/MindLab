import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  query:string;
  file: any;
  video:any;
  courses: any = [];
  constructor(private sanitizer: DomSanitizer, private service: StoreService,private router:Router) {}

  ngOnInit(): void {
    this.getallcourses();
  
  }

  getallcourses() {
    this.service.getService().subscribe(
      (res) => {

        this.courses = res;
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log(this.courses);
      }
    );
  }
  deleteCourse(id:any){
    this.service.deleteService(id).subscribe((res)=>{
         console.log('deleted')
         this.service.getService().subscribe((res) => {

          this.courses = res;
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log(this.courses);
        })
    })
  }
  getfile(f: any) {
    console.log(f);
    this.file = '';
    this.file = this.sanitizer.bypassSecurityTrustResourceUrl(
      'assets/uploads/courses/'+f
    );
  }
  getCourse(id:any){
    this.router.navigate(['/coursedetails',id])
  }
   getresult(query:any){
     this.router.navigate(['/result',query])
   }

}
