import { InstructorService } from './../../services/instructor-service.service';
import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  isExpanded: Boolean = false;
  display: string = 'instructors';
  query: string = '';
  instructors: any;
  students: any;
  courses: any;
  result: any;

  constructor(
    private instructorService: InstructorService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.instructorService
      .getAllInstructors()
      .subscribe((res) => (this.instructors = res));

    this.studentService.getAllStudents().subscribe((res) => {
      this.students = res;
    });
  }

  toggleClass() {
    this.isExpanded = !this.isExpanded;
  }

  changeDisplay(display: string) {
    this.display = display;
  }

  getProfile(id: any, role: any) {
    this.router.navigate(['/profile', role, id]).then(() => {
      window.location.reload();
    });
  }

  changeStatus(id: string, role: string, status: string) {
    if (role === 'instructor') {
      this.instructorService
        .changeInstructorStatus(id, { status: status })
        .subscribe(() => {
          this.instructorService.getAllInstructors().subscribe((res) => {
            this.instructors = res;
            console.log(res);
          });
        });
    } else {
      this.studentService
        .changeStudentStatus(id, { status: status })
        .subscribe(() => {
          this.studentService.getAllStudents().subscribe((res: any) => {
            this.students = res;
            console.log(res);
          });
        });
    }
  }

  search(input: any) {
    if (this.display === 'instructors') {
      if (!input.value) {
        this.result = undefined;
        return;
      }
      var arr = [];
      for (var ele of this.instructors) {
        if (ele.username.toLowerCase() === input.value.toLowerCase()) {
          arr.push(ele);
        }
      }
      this.result = arr;
    } else if (this.display === 'students') {
      if (!input.value) {
        this.result = undefined;
        return;
      }
      var arr = [];
      for (var ele of this.students) {
        if (ele.username.toLowerCase() === input.value.toLowerCase()) {
          arr.push(ele);
        }
      }
      this.result = arr;
    }
  }
}
