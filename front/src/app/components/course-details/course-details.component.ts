import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';
import { DetailsService } from '../../services/details.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { InstructorService } from '../../services/instructor-service.service';
@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  @Input() rating: any;
  @Input() itemId: any;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  user: any = JSON.parse(localStorage.getItem('user') || '{}');
  lib: any = [];
  inputName: any;
  starRating: any;
  id: any;
  file: any;
  video: any;
  course: any = {};
  courses: any = [];
  show: boolean = false;
  text: any;
  query: any;
  comments: any = [];
  rates: any = [];
  edit: boolean = false;
  change1: boolean = false;
  students: any = [];
  instructors: any = [];
  users: any = [];
  isUserUndefined: boolean = false;
  constructor(
    private activateroute: ActivatedRoute,
    private StoreService: StoreService,
    private sanitizer: DomSanitizer,
    private router: Router,

    private InstructorService: InstructorService,
    private detailsService: DetailsService,
    private StudentService: StudentService
  ) {}

  ngOnInit(): void {
    if (Object.keys(this.user).length === 0) {
      this.isUserUndefined = true;
    }
    if (this.user.role === 'student') {
      for (var ele of this.user.library) {
        if (ele) {
          this.lib.push(ele._id);
        }
      }
    }
    this.id = this.activateroute.snapshot.params.id;
    this.StoreService.getService().subscribe((data) => {
      this.courses = data;

      this.courses.forEach((elm: any) => {
        if (elm._id === this.id) {
          this.comments = elm.comments;
          this.rates = elm.rates;
        }
      });
    });
    this.inputName = this.itemId + '_rating';

    console.log('user', this.user._id);
    this.StudentService.getAllStudents().subscribe((res) => {
      this.students = res;
      for (var i = 0; i < this.students.length; i++) {
        this.users.push(this.students[i]);
      }
    });
    this.InstructorService.getAllInstructors().subscribe((res) => {
      this.instructors = res;
      for (var i = 0; i < this.instructors.length; i++) {
        this.users.push(this.instructors[i]);
      }
    });
    this.users = this.instructors;
    this.StoreService.getCourseById(this.id).subscribe((res) => {
      this.course = res;
      console.log('course', this.course);
      if (this.user._id === this.course.IdInstructor) {
        this.show = !this.show;
      }
    });
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating,
    });
    for (var i = 0; i < this.rates.length; i++) {
      if (this.user._id === this.rates[i].raterId) {
        this.change1 = true;
        this.detailsService
          .editRateService(this.id, this.rates[i]._id, this.rating)
          .subscribe((data) => {
            console.log('rate updateed');
          });
      }
    }
    if (this.change1 === false) {
      this.detailsService
        .addRateService(this.id, this.user._id, this.rating)
        .subscribe((data) => {
          console.log('rate addedd');
        });
    }
  }

  getfile(f: any) {
    this.file = '';
    // this.file = this.sanitizer.bypassSecurityTrustResourceUrl(
    //   'assets/uploads/courses/' + f    );
    const imgpdf = f.slice(0, -3) + 'jpg';

    this.file = imgpdf;
    console.log(this.file);
  }
  editCourse(id: any) {
    this.router.navigate(['/edit', id]);
  }
  postComment() {
    console.log(this.text);
    this.detailsService
      .addService(this.id, this.user._id, this.user.username, this.text)
      .subscribe((data) => {
        console.log(data);
        console.log('comment added');
        this.videInput();
        this.StoreService.getService().subscribe(
          (data) => {
            this.courses = data;
            console.log('courses', this.courses);

            this.courses.forEach((elm: any) => {
              if (elm._id === this.id) {
                this.comments = elm.comments;
                console.log(this.comments);
                this.course = elm;
                console.log('elm', elm);
              }
            });
          },
          (error) => {
            console.log(error);
          }
        );
      });
  }
  videInput() {
    this.text = '';
  }
  change() {
    this.edit = !this.edit;
  }
  getProfile(id: any, role: any) {
    this.router.navigate(['/profile', role, id]).then(() => {
      window.location.reload();
    });
  }
  editComment(comment: any) {
    if (this.user._id === comment.commenterId) {
      this.detailsService
        .editService(this.course._id, comment._id, this.text)
        .subscribe((data) => {
          console.log(data);
          console.log('comment updated');

          this.StoreService.getService().subscribe(
            (data) => {
              this.courses = data;
              this.courses.forEach((elm: any) => {
                if (elm._id === this.id) {
                  this.comments = elm.comments;
                  console.log(this.comments);
                  this.course = elm;
                  console.log('elm', elm);
                }
              });
            },
            (error) => {
              console.log(error);
            }
          );
        });
    }
  }
  deleteComment(comment: any) {
    if (this.user._id === comment.commenterId) {
      this.detailsService
        .deleteService(this.course._id, comment._id)
        .subscribe((data) => {
          console.log(data);

          console.log('comment deleted');
          this.StoreService.getService().subscribe(
            (data) => {
              this.courses = data;
              console.log('courses', this.courses);

              this.courses.forEach((elm: any) => {
                if (elm._id === this.id) {
                  this.comments = elm.comments;
                  console.log(this.comments);
                  this.course = elm;
                  console.log('elm', elm);
                }
              });
            },
            (error) => {
              console.log(error);
            }
          );
        });
    }
  }
  update(value: any) {
    this.starRating = value;
    console.log(this.starRating);
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
