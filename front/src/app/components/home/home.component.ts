import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { StudentService } from './../../services/student.service';
import { InstructorService } from '../../services/instructor-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  instructorCount: any;
  courseCount: any;
  studentCount: any;
  constructor( private router: Router, private storeService: StoreService,
    private instructorService: InstructorService,
    private studentService: StudentService,) {}
  query: any;
  ngOnInit(): void {
    this.storeService.getService().subscribe((res: any) => {
      this.courseCount = res.length;
    })
    this.studentService.getAllStudents().subscribe((res: any) => {
      this.studentCount = res.length;
    });
    this.instructorService.getAllInstructors().subscribe((res: any) => {
      this.instructorCount = res.length;
    })
  }
     
  getresult(query: any) {
    this.router.navigate(['/result', query]).then(() => {
      location.reload();
    });
  }
}
