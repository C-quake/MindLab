import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css'],
})
export class SignupStudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private router: Router,
    private authService: SocialAuthService
  ) {}
  err: boolean = false;
  ngOnInit(): void {
    this.authService.authState.subscribe((user: any) => {
      this.studentService.findStudent(user.email).subscribe((res: any) => {
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
        } else {
          user.username = user.name;
          user.image = user.photoUrl;
          user.role = 'student';
          this.studentService.addstudent(user).subscribe((res) => {
            localStorage.setItem('user', JSON.stringify(res));
          });
        }
      });
    });
  }

  async signInWithGoogle(): Promise<void> {
    let user = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  submit(f: any) {
    if (!f.username || !f.email || !f.password) {
      this.err = true;
      return;
    }
    var obj = {
      username: f.username,
      email: f.email,
      password: f.password,
      image: 'default-profile.jpg',
      about: '',
      firstName: '',
      lastName: '',
      mobile: '',
      location: '',
      experience: [],
      social: [],
      role: 'student',
    };

    this.studentService.addstudent(obj).subscribe((data) => {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    });
  }
}
