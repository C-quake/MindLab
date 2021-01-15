import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { StoreService } from './../../services/store.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
})
export class LibraryComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  query: any;
  file:any
  constructor(private studentService: StudentService, private router: Router,    private storeService: StoreService,
    ) {}

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
  getfile(f: any) {
    this.file = '';
    // this.file = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'assets/uploads/courses/' + f    );
    const imgpdf=f.slice(0,-3)+'jpg'

    this.file =imgpdf
    console.log(this.file);

  }

}
