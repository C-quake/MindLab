import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  query: any;
  file: any;
  video: any;
  courses: any = [];
  results: any = [];
  lib: any = [];
  constructor(
    private sanitizer: DomSanitizer,
    private service: StoreService,
    private router: Router,
    private activateroute: ActivatedRoute,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.getallcourses();
    if (this.user.role === 'student') {
      for (var ele of this.user.library) {
        this.lib.push(ele._id);
      }
    }
  }

  addToLibrary(course: any) {
    this.lib.push(course._id);
    this.user.library.push(course);
    console.log(this.lib);
    localStorage.setItem('user', JSON.stringify(this.user));
    this.profileService
      .update(this.user._id, { library: this.lib })
      .subscribe(() =>
        this.router.navigate(['library']).then(() => {
          location.reload();
        })
      );
  }

  switchPaypal(id: any) {
    this.router.navigate(['/paypal', id]);
  }

  getallcourses() {
    this.query = this.activateroute.snapshot.params.query;

    this.service.getService().subscribe(
      (res) => {
        console.log(res);
        this.courses = res;
        this.results = this.courses.filter(
          (item: any) =>
            item.title === this.query || item.category.includes(this.query)
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        console.log(this.courses);
      }
    );
  }

  getfile(f: any) {
    this.file = '';
    // this.file = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'assets/uploads/courses/' + f    );
    const imgpdf = f.slice(0, -3) + 'jpg';

    this.file = imgpdf;
    console.log(this.file);
  }
  getCourse(id: any) {
    this.router.navigate(['/coursedetails', id]).then(() => {
      location.reload();
    });
  }
  getresult(query: any) {
    this.router.navigate(['/result', query]).then(() => {
      location.reload();
    });
  }
  Logout() {
    localStorage.clear();
  }
}
