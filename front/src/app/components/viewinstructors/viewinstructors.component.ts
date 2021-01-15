import { Component, OnInit } from '@angular/core';

import { ProfileService } from './../../services/profile.service';
import { StoreService } from './../../services/store.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { InstructorService } from '../../services/instructor-service.service';

@Component({
  selector: 'app-viewinstructors',
  templateUrl: './viewinstructors.component.html',
  styleUrls: ['./viewinstructors.component.css'],
})
export class ViewinstructorsComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  page = 1;
  count = 0;
  tableSize = 7;
  query: any;
  tableSizes = [3, 6, 9, 12];
  currentIndex: any;

  instructors: any = [];
  constructor(
    private sanitizer: DomSanitizer,
    private storeService: StoreService,
    private router: Router,
    private instructorService: InstructorService
  ) {}

  ngOnInit(): void {
    this.getAllInstructors();
  }
  Logout() {
    localStorage.clear();
  }
  getresult(query: any) {
    this.router.navigate(['/result', query]);
  }

  getAllInstructors() {
    this.instructorService.getAllInstructors().subscribe((res: any) => {
      this.instructors = res;
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllInstructors();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllInstructors();
  }
  getProfile(id: any, role: any) {
    this.router.navigate(['/profile', role, id]).then(() => {
      window.location.reload();
    });
  }
}
