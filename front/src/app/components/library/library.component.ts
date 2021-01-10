import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  query: any;
  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit(): void {}
  getCourse(id: any) {
    this.router.navigate(['/coursedetails', id]).then(() => {
      window.location.reload();
    });
  }
  Logout() {
    localStorage.clear();
  }
  getresult(query: any) {
    this.router.navigate(['/result', query]).then(() => {
      location.reload();
    });
  }
}
