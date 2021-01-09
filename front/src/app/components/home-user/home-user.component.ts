import { Component, OnInit } from '@angular/core';
import { StudentService } from './../../services/student.service';
import { StoreService } from '../../services/store.service';
import { InstructorService } from '../../services/instructor-service.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css'],
})
export class HomeUserComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  courses: any = [];
  ready: Boolean = false;
  instructors: any = [];
  paypal: boolean = false;
  instructorCount: any;
  courseCount: any;
  studentCount: any;
  selectedCourse: any;
  lib: any = [];
  query: string = '';

  constructor(
    private storeService: StoreService,
    private instructorService: InstructorService,
    private studentService: StudentService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('initializing');

    this.storeService.getService().subscribe((res: any) => {
      this.courses = res;
      this.courseCount = res.length;

      this.courses = this.courses
        .map((course: any) => {
          var sum = 0;
          course.rates.map((rate: any) => {
            sum = sum + rate.rates;
          });
          course['averagerate'] = (sum / course.rates.length).toFixed(1);

          console.log(course);
          return course;
        })
        .sort(function (a: any, b: any) {
          return b.averagerate - a.averagerate;
        });
    });
    console.log('courses', this.courses);

    // this.ready = true;
    this.instructorService.getAllInstructors().subscribe((res: any) => {
      this.instructorCount = res.length;
      this.instructors = res;
    });

    this.studentService.getAllStudents().subscribe((res: any) => {
      this.studentCount = res.length;
    });

    if (this.user.role === 'student') {
      for (var ele of this.user.library) {
        this.lib.push(ele._id);
      }
    }
  }

  getReady() {
    this.ready = true;
  }

  getCourse(id: any) {
    this.router.navigate(['/coursedetails', id]).then(() => {
      window.location.reload();
    });
  }

  addToLibrary(course: any) {
    this.lib.push(course._id);
    this.user.library.push(course);
    console.log(this.lib);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.profileService
      .update(this.user._id, { library: this.lib })
      .subscribe(() => this.router.navigate(['library']));
  }

  switchPaypal(bool: boolean, course: any) {
    this.paypal = bool;
    this.selectedCourse = course;
  }

  Logout() {
    localStorage.clear();
  }
  getcourses() {
    this.router.navigate(['/viewcourses']).then(() => {
      window.location.reload();
    });
  }
  getInstructors() {
    this.router.navigate(['/viewinstructors']).then(() => {
      window.location.reload();
    });
  }
  getresult(query: any) {
    this.router.navigate(['/result', query])
    .then(()=>{
      window.location.reload();

    })
  }
}
