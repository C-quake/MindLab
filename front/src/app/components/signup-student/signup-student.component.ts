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
  isBanned: boolean = false;

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
          if (res.message) {
            this.isBanned = true;
            return;
          }

          res.image =
            '../../../assets/images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg';
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        } else {
          user.username = user.name;
          user.image = user.photoUrl;
          user.library = [];
          user.social = {
            facebook: '',
            twitter: '',
            linkedin: '',
            github: '',
          };
          this.studentService.addstudent(user).subscribe((res: any) => {
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
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
      image:
        '../../../assets/images/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg',
      about: '',
      firstName: '',
      lastName: '',
      mobile: '',
      location: '',
      experience: [],
      social: {
        facebook: '',
        twitter: '',
        linkedin: '',
        github: '',
      },
      library: [],
    };

    this.studentService.addstudent(obj).subscribe((data: any) => {
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    });
  }
}
