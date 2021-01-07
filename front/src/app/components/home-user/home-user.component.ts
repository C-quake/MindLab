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
  courses: any = {};
  // courses: any = JSON.parse(localStorage.getItem('courses') || '{}');
  ready: Boolean = false;
  instructors: any;
  instructorCount: any;
  courseCount: any;
  paypal: boolean = false;
  selectedCourse: any;
  lib: any = [];
  constructor(
    private storeService: StoreService,
    private instructorService: InstructorService,
    private studentService: StudentService,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('initializing');

    this.storeService.getService().subscribe((res) => {
      this.courses = res;
      console.log(this.courses);
    });

    // this.ready = true;
    this.instructorService.getAllInstructors().subscribe((res: any) => {
      this.instructorCount = res.length;
      this.instructors = res.slice(0, 3);
    });
    this.storeService.getService().subscribe((res: any) => {
      this.courseCount = res.length;
    });
    if (this.user.role === 'student') {
      for (var ele of this.user.library) {
        this.lib.push(ele._id);
      }
      console.log(this.lib);
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

  isLoggedIn() {
    return Object.keys(this.user).length === 0 ? false : true;
  }
}
