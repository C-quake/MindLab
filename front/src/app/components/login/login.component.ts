import { StudentService } from './../../services/student.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { InstructorService } from '../../services/instructor-service.service';
// import { Observable } from 'rxjs/Observable';

import { User } from '../../models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  //  roles = ['admin','student','instructor'];
  // user: Observable<User[]>;
  isBanned: boolean = false;
  loginForm: any;
  role: string = '';
  options = [{ role: 'Admin' }, { role: 'student' }, { role: 'instructor' }];
  constructor(
    private _service: LoginService,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private authService: SocialAuthService,
    private studentService: StudentService,
    private instructorService: InstructorService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      selectedOption: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user: any) => {
      if (this.role === 'instructor') {
        this.instructorService
          .findInstructor(user.email)
          .subscribe((res: any) => {
            if (res) {
              if (res.message) {
                this.isBanned = true;
                return;
              }
              localStorage.setItem('user', JSON.stringify(res));
              this._router.navigate(['/home']).then(() => {
                location.reload();
              });
            } else {
              user.username = user.name;
              user.image = user.photoUrl;
              user.role = 'instructor';
              user.social = {
                facebook: '',
                twitter: '',
                linkedin: '',
                github: '',
              };
              user.store = [];
              this.instructorService.addInstructor(user).subscribe((res) => {
                localStorage.setItem('user', JSON.stringify(res));
                this._router.navigate(['/home']).then(() => {
                  location.reload();
                });
              });
            }
          });
      } else {
        this.studentService.findStudent(user.email).subscribe((res: any) => {
          if (res) {
            if (res.message) {
              this.isBanned = true;
              return;
            }
            localStorage.setItem('user', JSON.stringify(res));
            this._router.navigate(['/home']).then(() => {
              location.reload();
            });
          } else {
            user.username = user.name;
            user.image = user.photoUrl;
            user.role = 'student';
            user.library = [];
            user.social = {
              facebook: '',
              twitter: '',
              linkedin: '',
              github: '',
            };
            this.studentService.addstudent(user).subscribe((res: any) => {
              localStorage.setItem('user', JSON.stringify(res));
              this._router.navigate(['/home']).then(() => {
                location.reload();
              });
            });
          }
        });
      }
    });
  }
  isValid(controlName: String) {
    return (
      this.loginForm.get(controlName).invalid &&
      this.loginForm.get(controlName).touched
    );
  }

  signInWithGoogle(role: string): void {
    this.role = role;
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  login() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.selectedOption === 'student') {
        this._service.login1(this.loginForm.value).subscribe(
          (data: any) => {
            if (data.message) {
              this.isBanned = true;
              return;
            }
            console.log(data.data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data));
            this._router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (this.loginForm.value.selectedOption === 'instructor') {
        this._service.login2(this.loginForm.value).subscribe(
          (data: any) => {
            if (data.message) {
              this.isBanned = true;
              return;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data));
            this._router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
}
